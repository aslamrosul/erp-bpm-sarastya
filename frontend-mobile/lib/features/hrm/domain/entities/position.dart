import 'package:equatable/equatable.dart';

class Position extends Equatable {
  final String id;
  final String code;
  final String title;
  final String? description;
  final String level;
  final double minSalary;
  final double maxSalary;
  final int employeeCount;
  final bool isActive;

  const Position({
    required this.id,
    required this.code,
    required this.title,
    this.description,
    required this.level,
    required this.minSalary,
    required this.maxSalary,
    required this.employeeCount,
    required this.isActive,
  });

  @override
  List<Object?> get props => [
        id,
        code,
        title,
        description,
        level,
        minSalary,
        maxSalary,
        employeeCount,
        isActive,
      ];
}
