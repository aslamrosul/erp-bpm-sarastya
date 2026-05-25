import 'package:equatable/equatable.dart';

class Project extends Equatable {
  final String id; // Changed from int to String for GUID
  final String name;
  final String description;
  final DateTime startDate;
  final DateTime endDate;
  final String status;
  final int progress;
  final double budget;
  final String? managerName;

  const Project({
    required this.id,
    required this.name,
    required this.description,
    required this.startDate,
    required this.endDate,
    required this.status,
    required this.progress,
    required this.budget,
    this.managerName,
  });

  @override
  List<Object?> get props => [
        id,
        name,
        description,
        startDate,
        endDate,
        status,
        progress,
        budget,
        managerName,
      ];
}
