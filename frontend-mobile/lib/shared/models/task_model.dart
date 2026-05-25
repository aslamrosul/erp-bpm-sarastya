class TaskModel {
  final String id;
  final String title;
  final String description;
  final String status;
  final int priority;
  final DateTime? dueDate;
  final String projectId;
  final String? assigneeId;

  TaskModel({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.priority,
    this.dueDate,
    required this.projectId,
    this.assigneeId,
  });

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      status: json['status'] ?? 'Todo',
      priority: json['priority'] ?? 0,
      dueDate: json['dueDate'] != null ? DateTime.parse(json['dueDate']) : null,
      projectId: json['projectId'] ?? '',
      assigneeId: json['assigneeId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status,
      'priority': priority,
      'dueDate': dueDate?.toIso8601String(),
      'projectId': projectId,
      'assigneeId': assigneeId,
    };
  }
}
