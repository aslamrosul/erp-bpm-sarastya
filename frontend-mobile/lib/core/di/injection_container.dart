import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../features/auth/data/datasources/auth_local_datasource.dart';
import '../../features/auth/data/datasources/auth_remote_datasource.dart';
import '../../features/auth/data/repositories/auth_repository_impl.dart';
import '../../features/auth/domain/repositories/auth_repository.dart';
import '../../features/auth/domain/usecases/login_usecase.dart';
import '../../features/auth/domain/usecases/logout_usecase.dart';
import '../../features/auth/presentation/bloc/auth_bloc.dart';

import '../../features/hrm/data/datasources/employee_remote_datasource.dart';
import '../../features/hrm/data/repositories/employee_repository_impl.dart';
import '../../features/hrm/domain/repositories/employee_repository.dart';
import '../../features/hrm/domain/usecases/get_employees_usecase.dart';
import '../../features/hrm/presentation/bloc/employee_bloc.dart';

import '../../features/projects/data/datasources/project_remote_datasource.dart';
import '../../features/dashboard/data/datasources/dashboard_remote_datasource.dart';
import '../../features/tasks/data/datasources/task_remote_datasource.dart';

import '../network/dio_client.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // BLoC
  sl.registerFactory(
    () => AuthBloc(
      loginUseCase: sl(),
      logoutUseCase: sl(),
      authRepository: sl(),
    ),
  );

  sl.registerFactory(
    () => EmployeeBloc(getEmployeesUseCase: sl()),
  );

  // Use cases - Auth
  sl.registerLazySingleton(() => LoginUseCase(sl()));
  sl.registerLazySingleton(() => LogoutUseCase(sl()));

  // Use cases - HRM
  sl.registerLazySingleton(() => GetEmployeesUseCase(sl()));

  // Repository - Auth
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(
      remoteDataSource: sl(),
      localDataSource: sl(),
    ),
  );

  // Repository - HRM
  sl.registerLazySingleton<EmployeeRepository>(
    () => EmployeeRepositoryImpl(remoteDataSource: sl()),
  );

  // Data sources - Auth
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(dio: sl()),
  );

  sl.registerLazySingleton<AuthLocalDataSource>(
    () => AuthLocalDataSourceImpl(sharedPreferences: sl()),
  );

  // Data sources - HRM
  sl.registerLazySingleton<EmployeeRemoteDataSource>(
    () => EmployeeRemoteDataSourceImpl(dio: sl()),
  );

  // Data sources - Projects
  sl.registerLazySingleton<ProjectRemoteDataSource>(
    () => ProjectRemoteDataSourceImpl(dio: sl()),
  );

  // Data sources - Dashboard
  sl.registerLazySingleton<DashboardRemoteDataSource>(
    () => DashboardRemoteDataSourceImpl(dio: sl()),
  );

  // Data sources - Tasks
  sl.registerLazySingleton<TaskRemoteDataSource>(
    () => TaskRemoteDataSourceImpl(dio: sl()),
  );

  // External
  sl.registerLazySingleton<Dio>(() => DioClient.createDio());

  final sharedPreferences = await SharedPreferences.getInstance();
  sl.registerLazySingleton(() => sharedPreferences);
}
