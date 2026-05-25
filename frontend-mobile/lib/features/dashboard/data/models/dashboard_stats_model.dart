import '../../domain/entities/dashboard_stats.dart';

class DashboardStatsModel extends DashboardStats {
  const DashboardStatsModel({
    required super.totalProjects,
    required super.activeProjects,
    required super.totalTasks,
    required super.completedTasks,
    required super.totalEmployees,
    required super.activeEmployees,
  });

  factory DashboardStatsModel.fromJson(Map<String, dynamic> json) {
    return DashboardStatsModel(
      totalProjects: json['totalProjects'] as int,
      activeProjects: json['activeProjects'] as int,
      totalTasks: json['totalTasks'] as int,
      completedTasks: json['completedTasks'] as int,
      totalEmployees: json['totalUsers'] as int, // Backend returns 'totalUsers'
      activeEmployees: json['totalUsers'] as int, // Use totalUsers as activeEmployees for now
    );
  }
}
