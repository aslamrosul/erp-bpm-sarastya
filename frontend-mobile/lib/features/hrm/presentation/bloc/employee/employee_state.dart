import 'package:equatable/equatable.dart';
import '../../../domain/entities/employee.dart';

abstract class EmployeeState extends Equatable {
  const EmployeeState();

  @override
  List<Object?> get props => [];
}

class EmployeeInitial extends EmployeeState {}

class EmployeeLoading extends EmployeeState {}

class EmployeesLoaded extends EmployeeState {
  final List<Employee> employees;

  const EmployeesLoaded(this.employees);

  @override
  List<Object?> get props => [employees];
}

class EmployeeLoaded extends EmployeeState {
  final Employee employee;

  const EmployeeLoaded(this.employee);

  @override
  List<Object?> get props => [employee];
}

class EmployeeOperationSuccess extends EmployeeState {
  final String message;

  const EmployeeOperationSuccess(this.message);

  @override
  List<Object?> get props => [message];
}

class EmployeeError extends EmployeeState {
  final String message;

  const EmployeeError(this.message);

  @override
  List<Object?> get props => [message];
}
