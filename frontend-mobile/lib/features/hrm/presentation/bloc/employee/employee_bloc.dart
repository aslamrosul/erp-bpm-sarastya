import 'package:flutter_bloc/flutter_bloc.dart';
import '../../../../../core/usecases/usecase.dart';
import '../../../domain/usecases/get_employees.dart';
import 'employee_event.dart';
import 'employee_state.dart';

class EmployeeBloc extends Bloc<EmployeeEvent, EmployeeState> {
  final GetEmployees getEmployees;

  EmployeeBloc({
    required this.getEmployees,
  }) : super(EmployeeInitial()) {
    on<LoadEmployees>(_onLoadEmployees);
  }

  Future<void> _onLoadEmployees(
    LoadEmployees event,
    Emitter<EmployeeState> emit,
  ) async {
    emit(EmployeeLoading());
    
    final result = await getEmployees(NoParams());
    
    result.fold(
      (failure) => emit(const EmployeeError('Failed to load employees')),
      (employees) => emit(EmployeesLoaded(employees)),
    );
  }
}
