class Task {
  final String id;
  final String title;
  final String description;
  final String status;
  final String priority;
  final DateTime? startDate;
  final DateTime? endDate;
  final DateTime? dueDate;
  final String projectId;
  final String? projectName;
  final String? assigneeId;
  final String? assigneeName;
  final DateTime createdAt;
  final DateTime? updatedAt;

  Task({
    required this.id,
    required this.title,
    required this.description,
    required this.status,
    required this.priority,
    this.startDate,
    this.endDate,
    this.dueDate,
    required this.projectId,
    this.projectName,
    this.assigneeId,
    this.assigneeName,
    required this.createdAt,
    this.updatedAt,
  });

  factory Task.fromJson(Map<String, dynamic> json) {
    return Task(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      status: json['status'] ?? 'Todo',
      priority: json['priority'] ?? 'Medium',
      startDate: json['startDate'] != null ? DateTime.parse(json['startDate']) : null,
      endDate: json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
      dueDate: json['dueDate'] != null ? DateTime.parse(json['dueDate']) : null,
      projectId: json['projectId'] ?? '',
      projectName: json['projectName'],
      assigneeId: json['assigneeId'],
      assigneeName: json['assigneeName'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: json['updatedAt'] != null ? DateTime.parse(json['updatedAt']) : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'status': status,
      'priority': priority,
      'startDate': startDate?.toIso8601String(),
      'endDate': endDate?.toIso8601String(),
      'dueDate': dueDate?.toIso8601String(),
      'projectId': projectId,
      'projectName': projectName,
      'assigneeId': assigneeId,
      'assigneeName': assigneeName,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt?.toIso8601String(),
    };
  }
}
