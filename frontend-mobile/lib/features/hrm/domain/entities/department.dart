import 'package:equatable/equatable.dart';

class Department extends Equatable {
  final String id;
  final String code;
  final String name;
  final String? description;
  final String? managerId;
  final String? managerName;
  final int employeeCount;
  final bool isActive;

  const Department({
    required this.id,
    required this.code,
    required this.name,
    this.description,
    this.managerId,
    this.managerName,
    required this.employeeCount,
    required this.isActive,
  });

  @override
  List<Object?> get props => [
        id,
        code,
        name,
        description,
        managerId,
        managerName,
        employeeCount,
        isActive,
      ];
}
