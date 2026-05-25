import 'package:dartz/dartz.dart';
import '../../../../core/error/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/employee.dart';
import '../repositories/employee_repository.dart';

class GetEmployeesUseCase implements UseCase<List<Employee>, NoParams> {
  final EmployeeRepository repository;

  GetEmployeesUseCase(this.repository);

  @override
  Future<Either<Failure, List<Employee>>> call(NoParams params) async {
    return await repository.getEmployees();
  }
}
