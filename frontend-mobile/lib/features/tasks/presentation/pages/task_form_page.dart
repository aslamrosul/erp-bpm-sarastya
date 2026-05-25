import 'package:flutter/material.dart';
import '../../../../core/di/injection_container.dart' as di;
import '../../data/datasources/task_remote_datasource.dart';
import '../../domain/entities/task.dart';
import '../../../projects/data/datasources/project_remote_datasource.dart';
import '../../../projects/domain/entities/project.dart';

class TaskFormPage extends StatefulWidget {
  final Task? task;

  const TaskFormPage({super.key, this.task});

  @override
  State<TaskFormPage> createState() => _TaskFormPageState();
}

class _TaskFormPageState extends State<TaskFormPage> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _titleController;
  late TextEditingController _descriptionController;
  
  String _status = 'Todo';
  String _priority = 'Medium';
  DateTime? _startDate;
  DateTime? _endDate;
  DateTime? _dueDate;
  String? _selectedProjectId;
  List<Project> _projects = [];
  bool _isLoading = false;
  bool _isLoadingProjects = true;
  late TaskRemoteDataSource _dataSource;
  late ProjectRemoteDataSource _projectDataSource;

  @override
  void initState() {
    super.initState();
    _dataSource = di.sl<TaskRemoteDataSource>();
    _projectDataSource = di.sl<ProjectRemoteDataSource>();
    _titleController = TextEditingController(text: widget.task?.title ?? '');
    _descriptionController = TextEditingController(text: widget.task?.description ?? '');
    _status = widget.task?.status ?? 'Todo';
    _priority = widget.task?.priority ?? 'Medium';
    _startDate = widget.task?.startDate;
    _endDate = widget.task?.endDate;
    _dueDate = widget.task?.dueDate;
    _selectedProjectId = widget.task?.projectId;
    _loadProjects();
  }

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _loadProjects() async {
    try {
      final projects = await _projectDataSource.getProjects();
      setState(() {
        _projects = projects;
        _isLoadingProjects = false;
      });
    } catch (e) {
      setState(() => _isLoadingProjects = false);
    }
  }

  Future<void> _saveTask() async {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedProjectId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a project')),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final data = {
        'title': _titleController.text,
        'description': _descriptionController.text,
        'status': _status,
        'priority': _priority,
        'startDate': _startDate != null 
            ? DateTime.utc(_startDate!.year, _startDate!.month, _startDate!.day).toIso8601String()
            : null,
        'endDate': _endDate != null 
            ? DateTime.utc(_endDate!.year, _endDate!.month, _endDate!.day).toIso8601String()
            : null,
        'dueDate': _dueDate != null 
            ? DateTime.utc(_dueDate!.year, _dueDate!.month, _dueDate!.day).toIso8601String()
            : null,
        'projectId': _selectedProjectId,
        'assigneeId': null, // Can be extended later
      };

      if (widget.task != null) {
        await _dataSource.updateTask(widget.task!.id, data);
      } else {
        await _dataSource.createTask(data);
      }

      if (mounted) {
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Task ${widget.task != null ? 'updated' : 'created'} successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _selectDate(BuildContext context, String type) async {
    DateTime? initialDate;
    switch (type) {
      case 'start':
        initialDate = _startDate ?? DateTime.now();
        break;
      case 'end':
        initialDate = _endDate ?? DateTime.now();
        break;
      case 'due':
        initialDate = _dueDate ?? DateTime.now();
        break;
    }

    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: initialDate!,
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );
    
    if (picked != null) {
      setState(() {
        switch (type) {
          case 'start':
            _startDate = picked;
            break;
          case 'end':
            _endDate = picked;
            break;
          case 'due':
            _dueDate = picked;
            break;
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.task != null ? 'Edit Task' : 'New Task'),
        backgroundColor: const Color(0xFF7B2D8B),
        foregroundColor: Colors.white,
      ),
      body: _isLoadingProjects
          ? const Center(child: CircularProgressIndicator())
          : Form(
              key: _formKey,
              child: ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  TextFormField(
                    controller: _titleController,
                    decoration: const InputDecoration(
                      labelText: 'Task Title',
                      border: OutlineInputBorder(),
                    ),
                    validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
                  ),
                  const SizedBox(height: 16),
                  TextFormField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(
                      labelText: 'Description',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                    validator: (value) => value?.isEmpty ?? true ? 'Required' : null,
                  ),
                  const SizedBox(height: 16),
                  DropdownButtonFormField<String>(
                    value: _selectedProjectId,
                    decoration: const InputDecoration(
                      labelText: 'Project',
                      border: OutlineInputBorder(),
                    ),
                    items: _projects.map((project) {
                      return DropdownMenuItem(
                        value: project.id,
                        child: Text(project.name),
                      );
                    }).toList(),
                    onChanged: (value) => setState(() => _selectedProjectId = value),
                    validator: (value) => value == null ? 'Please select a project' : null,
                  ),
                  const SizedBox(height: 16),
                  DropdownButtonFormField<String>(
                    value: _status,
                    decoration: const InputDecoration(
                      labelText: 'Status',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: 'Todo', child: Text('Todo')),
                      DropdownMenuItem(value: 'InProgress', child: Text('In Progress')),
                      DropdownMenuItem(value: 'Done', child: Text('Done')),
                    ],
                    onChanged: (value) => setState(() => _status = value!),
                  ),
                  const SizedBox(height: 16),
                  DropdownButtonFormField<String>(
                    value: _priority,
                    decoration: const InputDecoration(
                      labelText: 'Priority',
                      border: OutlineInputBorder(),
                    ),
                    items: const [
                      DropdownMenuItem(value: 'Low', child: Text('Low')),
                      DropdownMenuItem(value: 'Medium', child: Text('Medium')),
                      DropdownMenuItem(value: 'High', child: Text('High')),
                    ],
                    onChanged: (value) => setState(() => _priority = value!),
                  ),
                  const SizedBox(height: 16),
                  ListTile(
                    title: const Text('Start Date'),
                    subtitle: Text(_startDate != null 
                        ? _startDate!.toString().split(' ')[0] 
                        : 'Not set'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (_startDate != null)
                          IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: () => setState(() => _startDate = null),
                          ),
                        const Icon(Icons.calendar_today),
                      ],
                    ),
                    onTap: () => _selectDate(context, 'start'),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: BorderSide(color: Colors.grey.shade400),
                    ),
                  ),
                  const SizedBox(height: 16),
                  ListTile(
                    title: const Text('End Date'),
                    subtitle: Text(_endDate != null 
                        ? _endDate!.toString().split(' ')[0] 
                        : 'Not set'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (_endDate != null)
                          IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: () => setState(() => _endDate = null),
                          ),
                        const Icon(Icons.calendar_today),
                      ],
                    ),
                    onTap: () => _selectDate(context, 'end'),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: BorderSide(color: Colors.grey.shade400),
                    ),
                  ),
                  const SizedBox(height: 16),
                  ListTile(
                    title: const Text('Due Date'),
                    subtitle: Text(_dueDate != null 
                        ? _dueDate!.toString().split(' ')[0] 
                        : 'Not set'),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (_dueDate != null)
                          IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: () => setState(() => _dueDate = null),
                          ),
                        const Icon(Icons.calendar_today),
                      ],
                    ),
                    onTap: () => _selectDate(context, 'due'),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                      side: BorderSide(color: Colors.grey.shade400),
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _saveTask,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF7B2D8B),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: _isLoading
                        ? const CircularProgressIndicator(color: Colors.white)
                        : Text(widget.task != null ? 'Update Task' : 'Create Task'),
                  ),
                ],
              ),
            ),
    );
  }
}
