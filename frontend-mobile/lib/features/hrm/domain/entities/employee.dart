import 'package:equatable/equatable.dart';

class Employee extends Equatable {
  final String id; // Changed from int to String for GUID
  final String firstName;
  final String lastName;
  final String email;
  final String phoneNumber;
  final DateTime hireDate;
  final String status;
  final String positionName;
  final String departmentName;
  final double? salary;

  const Employee({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.phoneNumber,
    required this.hireDate,
    required this.status,
    required this.positionName,
    required this.departmentName,
    this.salary,
  });

  String get fullName => '$firstName $lastName';

  @override
  List<Object?> get props => [
        id,
        firstName,
        lastName,
        email,
        phoneNumber,
        hireDate,
        status,
        positionName,
        departmentName,
        salary,
      ];
}
