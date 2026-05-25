import 'package:dio/dio.dart';
import '../models/employee_model.dart';
import '../../../../core/constants/api_constants.dart';

abstract class EmployeeRemoteDataSource {
  Future<List<EmployeeModel>> getEmployees();
  Future<EmployeeModel> getEmployeeById(String id);
  Future<EmployeeModel> createEmployee(Map<String, dynamic> data);
  Future<EmployeeModel> updateEmployee(String id, Map<String, dynamic> data);
  Future<void> deleteEmployee(String id);
}

class EmployeeRemoteDataSourceImpl implements EmployeeRemoteDataSource {
  final Dio dio;

  EmployeeRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<EmployeeModel>> getEmployees() async {
    final response = await dio.get('${ApiConstants.baseUrl}/employees');
    final List<dynamic> data = response.data as List<dynamic>;
    return data.map((json) => EmployeeModel.fromJson(json)).toList();
  }

  @override
  Future<EmployeeModel> getEmployeeById(String id) async {
    final response = await dio.get('${ApiConstants.baseUrl}/employees/$id');
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<EmployeeModel> createEmployee(Map<String, dynamic> data) async {
    final response = await dio.post('${ApiConstants.baseUrl}/employees', data: data);
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<EmployeeModel> updateEmployee(String id, Map<String, dynamic> data) async {
    final response = await dio.put('${ApiConstants.baseUrl}/employees/$id', data: data);
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<void> deleteEmployee(String id) async {
    await dio.delete('${ApiConstants.baseUrl}/employees/$id');
  }
}
