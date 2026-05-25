import 'package:equatable/equatable.dart';

abstract class EmployeeEvent extends Equatable {
  const EmployeeEvent();

  @override
  List<Object?> get props => [];
}

class LoadEmployees extends EmployeeEvent {}

class LoadEmployeeById extends EmployeeEvent {
  final String id;

  const LoadEmployeeById(this.id);

  @override
  List<Object?> get props => [id];
}

class CreateEmployee extends EmployeeEvent {
  final Map<String, dynamic> data;

  const CreateEmployee(this.data);

  @override
  List<Object?> get props => [data];
}

class UpdateEmployee extends EmployeeEvent {
  final String id;
  final Map<String, dynamic> data;

  const UpdateEmployee(this.id, this.data);

  @override
  List<Object?> get props => [id, data];
}

class DeleteEmployee extends EmployeeEvent {
  final String id;

  const DeleteEmployee(this.id);

  @override
  List<Object?> get props => [id];
}
