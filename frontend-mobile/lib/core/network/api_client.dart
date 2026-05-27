import 'package:dio/dio.dart';
import '../constants/api_constants.dart';
import '../services/storage_service.dart';

class ApiClient {
  final Dio _dio;
  final StorageService _storageService;

  ApiClient(this._dio, this._storageService) {
    _dio.options = BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    // Request interceptor - Add auth token
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await _storageService.getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) {
          if (error.response?.statusCode == 401) {
            // Handle unauthorized - could trigger logout
          }
          return handler.next(error);
        },
      ),
    );
  }

  Dio get dio => _dio;
}
