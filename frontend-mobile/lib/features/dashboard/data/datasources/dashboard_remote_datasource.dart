import 'package:dio/dio.dart';
import '../models/dashboard_stats_model.dart';
import '../../../../core/constants/api_constants.dart';

abstract class DashboardRemoteDataSource {
  Future<DashboardStatsModel> getStats();
}

class DashboardRemoteDataSourceImpl implements DashboardRemoteDataSource {
  final Dio dio;

  DashboardRemoteDataSourceImpl({required this.dio});

  @override
  Future<DashboardStatsModel> getStats() async {
    final response = await dio.get('${ApiConstants.baseUrl}/dashboard/stats');
    return DashboardStatsModel.fromJson(response.data);
  }
}
