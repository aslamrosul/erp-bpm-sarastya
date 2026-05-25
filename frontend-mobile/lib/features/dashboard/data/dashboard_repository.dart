import '../../../core/network/api_client.dart';

class DashboardRepository {
  final ApiClient _apiClient;

  DashboardRepository(this._apiClient);

  Future<Map<String, dynamic>> getStats() async {
    try {
      final response = await _apiClient.dio.get('/dashboard/stats');
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Map<String, dynamic>>> getRecentActivities() async {
    try {
      final response = await _apiClient.dio.get('/dashboard/activities');
      return List<Map<String, dynamic>>.from(response.data);
    } catch (e) {
      rethrow;
    }
  }
}
