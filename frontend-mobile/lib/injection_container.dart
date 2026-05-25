import 'package:get_it/get_it.dart';
import 'core/network/api_client.dart';
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
  
  sl.registerLazySingleton(() => ApiClient());
  sl.registerLazySingleton(() => AuthService(sl(), sl()));

  // Repositories
  sl.registerLazySingleton(() => AuthRepository(sl()));
  sl.registerLazySingleton(() => ProjectRepository(sl()));
  sl.registerLazySingleton(() => TaskRepository(sl()));
  sl.registerLazySingleton(() => DashboardRepository(sl()));
  sl.registerLazySingleton(() => WorkflowRepository(sl()));
}
