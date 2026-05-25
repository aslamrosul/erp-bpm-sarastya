import 'package:dio/dio.dart';
import '../models/employee_model.dart';

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
    final response = await dio.get('/employees');
    return (response.data as List)
        .map((json) => EmployeeModel.fromJson(json))
        .toList();
  }

  @override
  Future<EmployeeModel> getEmployeeById(String id) async {
    final response = await dio.get('/employees/$id');
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<EmployeeModel> createEmployee(Map<String, dynamic> data) async {
    final response = await dio.post('/employees', data: data);
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<EmployeeModel> updateEmployee(String id, Map<String, dynamic> data) async {
    final response = await dio.put('/employees/$id', data: data);
    return EmployeeModel.fromJson(response.data);
  }

  @override
  Future<void> deleteEmployee(String id) async {
    await dio.delete('/employees/$id');
  }
}
