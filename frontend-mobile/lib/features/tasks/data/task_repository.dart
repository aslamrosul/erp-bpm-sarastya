import '../../../core/network/api_client.dart';

class TaskRepository {
  final ApiClient _apiClient;

  TaskRepository(this._apiClient);

  Future<List<Map<String, dynamic>>> getAll() async {
    try {
      final response = await _apiClient.dio.get('/tasks');
      return List<Map<String, dynamic>>.from(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Map<String, dynamic>>> getByProject(String projectId) async {
    try {
      final response = await _apiClient.dio.get('/tasks?projectId=$projectId');
      return List<Map<String, dynamic>>.from(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> create(Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.dio.post('/tasks', data: data);
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> update(String id, Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.dio.put('/tasks/$id', data: data);
      return response.data;
    } catch (e) {
      rethrow;
    }
  }
}
