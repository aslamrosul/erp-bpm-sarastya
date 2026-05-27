import 'package:dio/dio.dart';
import '../constants/api_constants.dart';
import '../services/storage_service.dart';

class AuthService {
  final Dio _dio;
  final StorageService _storageService;

  AuthService(this._dio, this._storageService);

  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post(
        '${ApiConstants.baseUrl}/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        final token = response.data['token'];
        await _storageService.saveToken(token);
        return response.data;
      } else {
        throw Exception('Login failed');
      }
    } catch (e) {
      throw Exception('Login error: $e');
    }
  }

  Future<void> logout() async {
    await _storageService.clearToken();
  }

  Future<bool> isLoggedIn() async {
    final token = await _storageService.getToken();
    return token != null;
  }
}
