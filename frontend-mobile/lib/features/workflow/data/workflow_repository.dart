import '../../../core/network/api_client.dart';

class WorkflowRepository {
  final ApiClient _apiClient;

  WorkflowRepository(this._apiClient);

  Future<List<Map<String, dynamic>>> getAll() async {
    try {
      final response = await _apiClient.dio.get('/workflow');
      return List<Map<String, dynamic>>.from(response.data);
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> getById(String id) async {
    try {
      final response = await _apiClient.dio.get('/workflow/$id');
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> execute(String id, Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.dio.post('/workflow/$id/execute', data: data);
      return response.data;
    } catch (e) {
      rethrow;
    }
  }
}
