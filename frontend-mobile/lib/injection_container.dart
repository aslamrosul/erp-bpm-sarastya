import 'package:dio/dio.dart';
import 'package:get_it/get_it.dart';
import 'core/network/api_client.dart';
import 'core/network/dio_client.dart';
import 'core/services/auth_service.dart';
import 'core/services/storage_service.dart';
import 'features/auth/data/auth_repository.dart';
import 'features/projects/data/project_repository.dart';
import 'features/tasks/data/task_repository.dart';
import 'features/dashboard/data/dashboard_repository.dart';
import 'features/workflow/data/workflow_repository.dart';

final sl = GetIt.instance;

Future<void> init() async {
  // Core Services
  final storageService = StorageService();
  await storageService.init();
  sl.registerSingleton<StorageService>(storageService);
  
  // Network
  sl.registerLazySingleton<Dio>(() => DioClient.createDio());
  sl.registerLazySingleton(() => ApiClient(sl<Dio>(), sl<StorageService>()));
  sl.registerLazySingleton(() => AuthService(sl<Dio>(), sl<StorageService>()));

  // Repositories
  sl.registerLazySingleton(() => AuthRepository(sl<ApiClient>()));
  sl.registerLazySingleton(() => ProjectRepository(sl<ApiClient>()));
  sl.registerLazySingleton(() => TaskRepository(sl<ApiClient>()));
  sl.registerLazySingleton(() => DashboardRepository(sl<ApiClient>()));
  sl.registerLazySingleton(() => WorkflowRepository(sl<ApiClient>()));
}
