import 'package:dio/dio.dart';
import '../models/login_response_model.dart';
import '../../../../core/constants/api_constants.dart';

abstract class AuthRemoteDataSource {
  Future<LoginResponseModel> login(String username, String password);
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final Dio dio;

  AuthRemoteDataSourceImpl({required this.dio});

  @override
  Future<LoginResponseModel> login(String username, String password) async {
    try {
      final response = await dio.post(
        '${ApiConstants.baseUrl}/auth/login',
        data: {
          'username': username,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        return LoginResponseModel.fromJson(response.data);
      } else {
        throw Exception('Login failed');
      }
    } catch (e) {
      throw Exception('Login error: $e');
    }
  }
}
