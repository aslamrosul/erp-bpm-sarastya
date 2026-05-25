import 'package:dartz/dartz.dart';
import '../../../../core/error/failures.dart';
import '../entities/employee.dart';

abstract class EmployeeRepository {
  Future<Either<Failure, List<Employee>>> getEmployees();
}
