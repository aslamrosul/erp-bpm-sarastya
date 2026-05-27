import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/di/injection_container.dart' as di;
import '../../data/datasources/project_remote_datasource.dart';
import '../../domain/entities/project.dart';

class ProjectFormPage extends StatefulWidget {
  final Project? project;

  const ProjectFormPage({super.key, this.project});

  @override
  State<ProjectFormPage> createState() => _ProjectFormPageState();
}

class _ProjectFormPageState extends State<ProjectFormPage> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _descriptionController;
  late TextEditingController _budgetController;
  
  DateTime? _startDate;
  DateTime? _endDate;
  String _status = 'Active';
  int _progress = 0;
  bool _isLoading = false;
  late ProjectRemoteDataSource _dataSource;

  @override
  void initState() {
    super.initState();
    _dataSource = di.sl<ProjectRemoteDataSource>();
    _nameController = TextEditingController(text: widget.project?.name ?? '');
    _descriptionController = TextEditingController(text: widget.project?.description ?? '');
    _budgetController = TextEditingController(text: widget.project?.budget.toString() ?? '');
    _startDate = widget.project?.startDate ?? DateTime.now();
    _endDate = widget.project?.endDate ?? DateTime.now().add(const Duration(days: 30));
    _status = widget.project?.status ?? 'Active';
    _progress = widget.project?.progress ?? 0;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _descriptionController.dispose();
    _budgetController.dispose();
    super.dispose();
  }

  Future<void> _saveProject() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      // Get current user ID from token storage
      final prefs = await SharedPreferences.getInstance();
      final userId = prefs.getString('user_id') ?? '31061aea-94c2-4538-9b97-6c677c6233c3';
      
      final data = {
        'name': _nameController.text,
        'description': _descriptionController.text,
        'startDate': DateTime.utc(_startDate!.year, _startDate!.month, _startDate!.day).toIso8601String(),
        'endDate': DateTime.utc(_endDate!.year, _endDate!.month, _endDate!.day).toIso8601String(),
        'status': _status,
        'progress': _progress,
        'budget': double.tryParse(_budgetController.text) ?? 0,
        'managerId': userId, // Use logged in user as manager
        'memberIds': [], // Add empty memberIds array
        // Don't send ownerId - backend gets it from JWT token
      };

      if (widget.project != null) {
        await _dataSource.updateProject(widget.project!.id, data);
      } else {
        await _dataSource.createProject(data);
      }

      if (mounted) {
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Project ${widget.project != null ? 'updated' : 'created'} successfully')),
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

  Future<void> _selectDate(BuildContext context, bool isStartDate) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: isStartDate ? _startDate! : _endDate!,
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );
    if (picked != null) {
      setState(() {
        if (isStartDate) {
          _startDate = picked;
        } else {
          _endDate = picked;
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.project != null ? 'Edit Project' : 'New Project'),
        backgroundColor: const Color(0xFF7B2D8B),
        foregroundColor: Colors.white,
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            TextFormField(
              controller: _nameController,
              decoration: const InputDecoration(
                labelText: 'Project Name',
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
            TextFormField(
              controller: _budgetController,
              decoration: const InputDecoration(
                labelText: 'Budget',
                border: OutlineInputBorder(),
                prefixText: 'Rp ',
              ),
              keyboardType: TextInputType.number,
            ),
            const SizedBox(height: 16),
            ListTile(
              title: const Text('Start Date'),
              subtitle: Text(_startDate != null ? _startDate!.toString().split(' ')[0] : 'Select date'),
              trailing: const Icon(Icons.calendar_today),
              onTap: () => _selectDate(context, true),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
                side: BorderSide(color: Colors.grey.shade400),
              ),
            ),
            const SizedBox(height: 16),
            ListTile(
              title: const Text('End Date'),
              subtitle: Text(_endDate != null ? _endDate!.toString().split(' ')[0] : 'Select date'),
              trailing: const Icon(Icons.calendar_today),
              onTap: () => _selectDate(context, false),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
                side: BorderSide(color: Colors.grey.shade400),
              ),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              initialValue: _status,
              decoration: const InputDecoration(
                labelText: 'Status',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'Active', child: Text('Active')),
                DropdownMenuItem(value: 'Completed', child: Text('Completed')),
                DropdownMenuItem(value: 'On Hold', child: Text('On Hold')),
              ],
              onChanged: (value) => setState(() => _status = value!),
            ),
            const SizedBox(height: 16),
            Text('Progress: $_progress%'),
            Slider(
              value: _progress.toDouble(),
              min: 0,
              max: 100,
              divisions: 20,
              label: '$_progress%',
              onChanged: (value) => setState(() => _progress = value.toInt()),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: _isLoading ? null : _saveProject,
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF7B2D8B),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(vertical: 16),
              ),
              child: _isLoading
                  ? const CircularProgressIndicator(color: Colors.white)
                  : Text(widget.project != null ? 'Update Project' : 'Create Project'),
            ),
          ],
        ),
      ),
    );
  }
}
