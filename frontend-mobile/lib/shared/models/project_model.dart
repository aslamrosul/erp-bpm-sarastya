class ProjectModel {
  final String id;
  final String name;
  final String description;
  final String status;
  final DateTime startDate;
  final DateTime? endDate;
  final String ownerId;

  ProjectModel({
    required this.id,
    required this.name,
    required this.description,
    required this.status,
    required this.startDate,
    this.endDate,
    required this.ownerId,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      status: json['status'] ?? 'Active',
      startDate: DateTime.parse(json['startDate']),
      endDate: json['endDate'] != null ? DateTime.parse(json['endDate']) : null,
      ownerId: json['ownerId'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'status': status,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate?.toIso8601String(),
      'ownerId': ownerId,
    };
  }
}
