import '../../domain/entities/project.dart';

class ProjectModel extends Project {
  const ProjectModel({
    required super.id,
    required super.name,
    required super.description,
    required super.startDate,
    required super.endDate,
    required super.status,
    required super.progress,
    required super.budget,
    super.managerName,
  });

  factory ProjectModel.fromJson(Map<String, dynamic> json) {
    return ProjectModel(
      id: json['id'] as String, // Backend returns GUID string
      name: json['name'] as String,
      description: json['description'] as String,
      startDate: DateTime.parse(json['startDate'] as String),
      endDate: DateTime.parse(json['endDate'] as String),
      status: json['status'] as String,
      progress: json['progress'] as int,
      budget: (json['budget'] as num).toDouble(),
      managerName: json['managerName'] as String?,
    );
  }
}
