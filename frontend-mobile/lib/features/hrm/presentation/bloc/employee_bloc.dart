import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../core/usecases/usecase.dart';
import '../../domain/usecases/get_employees_usecase.dart';
import 'employee_event.dart';
import 'employee_state.dart';

class EmployeeBloc extends Bloc<EmployeeEvent, EmployeeState> {
  final GetEmployeesUseCase getEmployeesUseCase;

  EmployeeBloc({required this.getEmployeesUseCase}) : super(EmployeeInitial()) {
    on<LoadEmployees>(_onLoadEmployees);
  }

  Future<void> _onLoadEmployees(
    LoadEmployees event,
    Emitter<EmployeeState> emit,
  ) async {
    emit(EmployeeLoading());

    final result = await getEmployeesUseCase(NoParams());

    result.fold(
      (failure) => emit(const EmployeeError(message: 'Failed to load employees')),
      (employees) => emit(EmployeeLoaded(employees: employees)),
    );
  }
}
