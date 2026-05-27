import '../../../core/network/api_client.dart';

class AuthRepository {
  final ApiClient _apiClient;

  AuthRepository(this._apiClient);

  Future<Map<String, dynamic>> login(String username, String password) async {
    try {
      final response = await _apiClient.dio.post(
        '/auth/login',
        data: {
          'username': username,
          'password': password,
        },
      );
      return response.data;
    } catch (e) {
      rethrow;
    }
  }

  Future<Map<String, dynamic>> register(Map<String, dynamic> data) async {
    try {
      final response = await _apiClient.dio.post('/auth/register', data: data);
      return response.data;
    } catch (e) {
      rethrow;
    }
  }
}
