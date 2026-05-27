import 'package:flutter/material.dart';
import '../../../../core/di/injection_container.dart' as di;
import '../../data/datasources/task_remote_datasource.dart';
import '../../domain/entities/task.dart';
import 'task_detail_page.dart';
import 'task_form_page.dart';

class TasksPage extends StatefulWidget {
  final String? projectId;
  
  const TasksPage({super.key, this.projectId});

  @override
  State<TasksPage> createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  late TaskRemoteDataSource _dataSource;
  List<Task> _tasks = [];
  bool _isLoading = true;
  String? _error;
  String _filterStatus = 'all';

  @override
  void initState() {
    super.initState();
    _dataSource = di.sl<TaskRemoteDataSource>();
    _loadTasks();
  }

  Future<void> _loadTasks() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final tasks = widget.projectId != null
          ? await _dataSource.getTasksByProject(widget.projectId!)
          : await _dataSource.getTasks();
      setState(() {
        _tasks = tasks;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load tasks';
        _isLoading = false;
      });
    }
  }

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'todo':
        return Colors.grey;
      case 'inprogress':
        return Colors.blue;
      case 'done':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  Color _getPriorityColor(String priority) {
    switch (priority.toLowerCase()) {
      case 'low':
        return Colors.green;
      case 'medium':
        return Colors.orange;
      case 'high':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Tasks'),
        backgroundColor: const Color(0xFF7B2D8B),
        foregroundColor: Colors.white,
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const TaskFormPage(),
            ),
          );
          if (result == true) _loadTasks();
        },
        backgroundColor: const Color(0xFF7B2D8B),
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              children: [
                const Text('Status: '),
                const SizedBox(width: 8),
                Expanded(
                  child: SegmentedButton<String>(
                    segments: const [
                      ButtonSegment(value: 'all', label: Text('All')),
                      ButtonSegment(value: 'Todo', label: Text('Todo')),
                      ButtonSegment(value: 'InProgress', label: Text('In Progress')),
                      ButtonSegment(value: 'Done', label: Text('Done')),
                    ],
                    selected: {_filterStatus},
                    onSelectionChanged: (Set<String> newSelection) {
                      setState(() => _filterStatus = newSelection.first);
                    },
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : _error != null
                    ? Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Icon(Icons.error_outline,
                                size: 64, color: Colors.red),
                            const SizedBox(height: 16),
                            Text(_error!),
                            const SizedBox(height: 16),
                            ElevatedButton(
                              onPressed: _loadTasks,
                              child: const Text('Retry'),
                            ),
                          ],
                        ),
                      )
                    : _tasks.isEmpty
                        ? const Center(child: Text('No tasks found'))
                        : RefreshIndicator(
                            onRefresh: _loadTasks,
                            child: ListView.builder(
                              padding: const EdgeInsets.all(16),
                              itemCount: _tasks.where((task) {
                                return _filterStatus == 'all' ||
                                    task.status == _filterStatus;
                              }).length,
                              itemBuilder: (context, index) {
                                final filteredTasks = _tasks.where((task) {
                                  return _filterStatus == 'all' ||
                                      task.status == _filterStatus;
                                }).toList();
                                final task = filteredTasks[index];
                                
                                return Card(
                                  margin: const EdgeInsets.only(bottom: 12),
                                  child: ListTile(
                                    leading: CircleAvatar(
                                      backgroundColor: _getPriorityColor(task.priority),
                                      child: Text(
                                        task.priority[0].toUpperCase(),
                                        style: const TextStyle(color: Colors.white),
                                      ),
                                    ),
                                    title: Text(
                                      task.title,
                                      style: const TextStyle(
                                          fontWeight: FontWeight.bold),
                                    ),
                                    subtitle: Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(task.description),
                                        const SizedBox(height: 4),
                                        Text(
                                          'Project: ${task.projectName ?? 'N/A'}',
                                          style: TextStyle(
                                            color: Colors.grey[600],
                                            fontSize: 12,
                                          ),
                                        ),
                                      ],
                                    ),
                                    trailing: Container(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8,
                                        vertical: 4,
                                      ),
                                      decoration: BoxDecoration(
                                        color: _getStatusColor(task.status)
                                            .withValues(alpha: 0.1),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(
                                        task.status,
                                        style: TextStyle(
                                          color: _getStatusColor(task.status),
                                          fontSize: 12,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                    isThreeLine: true,
                                    onTap: () async {
                                      final result = await Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              TaskDetailPage(task: task),
                                        ),
                                      );
                                      if (result == true) _loadTasks();
                                    },
                                  ),
                                );
                              },
                            ),
                          ),
          ),
        ],
      ),
    );
  }
}
