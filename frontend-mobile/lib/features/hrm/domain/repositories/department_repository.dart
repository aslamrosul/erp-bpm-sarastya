import 'package:dartz/dartz.dart';
import '../../../../core/error/failures.dart';
import '../entities/department.dart';

abstract class DepartmentRepository {
  Future<Either<Failure, List<Department>>> getDepartments();
  Future<Either<Failure, Department>> getDepartmentById(String id);
  Future<Either<Failure, Department>> createDepartment(Map<String, dynamic> data);
  Future<Either<Failure, Department>> updateDepartment(String id, Map<String, dynamic> data);
  Future<Either<Failure, void>> deleteDepartment(String id);
}
