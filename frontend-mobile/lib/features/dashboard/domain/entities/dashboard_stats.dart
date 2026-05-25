import 'package:equatable/equatable.dart';

class DashboardStats extends Equatable {
  final int totalProjects;
  final int activeProjects;
  final int totalTasks;
  final int completedTasks;
  final int totalEmployees;
  final int activeEmployees;

  const DashboardStats({
    required this.totalProjects,
    required this.activeProjects,
    required this.totalTasks,
    required this.completedTasks,
    required this.totalEmployees,
    required this.activeEmployees,
  });

  @override
  List<Object?> get props => [
        totalProjects,
        activeProjects,
        totalTasks,
        completedTasks,
        totalEmployees,
        activeEmployees,
      ];
}
