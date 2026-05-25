import '../../domain/entities/employee.dart';

class EmployeeModel extends Employee {
  const EmployeeModel({
    required super.id,
    required super.firstName,
    required super.lastName,
    required super.email,
    required super.phoneNumber,
    required super.hireDate,
    required super.status,
    required super.positionName,
    required super.departmentName,
    super.salary,
  });

  factory EmployeeModel.fromJson(Map<String, dynamic> json) {
    return EmployeeModel(
      id: json['id'] as String, // Backend returns GUID string
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      email: json['email'] as String,
      phoneNumber: json['phone'] as String, // Backend uses 'phone' not 'phoneNumber'
      hireDate: DateTime.parse(json['hireDate'] as String),
      status: json['status'] as String,
      positionName: json['positionName'] as String,
      departmentName: json['departmentName'] as String,
      salary: json['salary'] != null ? (json['salary'] as num).toDouble() : null,
    );
  }
}
