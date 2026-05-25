import '../../../core/network/api_client.dart';
import '../../../shared/models/project_model.dart';

class ProjectRepository {
  final ApiClient _apiClient;

  ProjectRepository(this._apiClient);

  Future<List<ProjectModel>> getAll() async {
    try {
      final response = await _apiClient.dio.get('/projects');
      return (response.data as List)
          .map((json) => ProjectModel.fromJson(json))
          .toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<ProjectModel> getById(String id) async {
    try {
      final response = await _apiClient.dio.get('/projects/$id');
      return ProjectModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<ProjectModel> create(Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.dio.post('/projects', data: data);
      return ProjectModel.fromJson(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
