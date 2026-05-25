import 'package:dio/dio.dart';
import '../../../../core/constants/api_constants.dart';
import '../../domain/entities/task.dart';

abstract class TaskRemoteDataSource {
  Future<List<Task>> getTasks();
  Future<List<Task>> getTasksByProject(String projectId);
  Future<Task> getTaskById(String id);
  Future<Task> createTask(Map<String, dynamic> data);
  Future<Task> updateTask(String id, Map<String, dynamic> data);
  Future<void> deleteTask(String id);
}

class TaskRemoteDataSourceImpl implements TaskRemoteDataSource {
  final Dio dio;

  TaskRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<Task>> getTasks() async {
    final response = await dio.get('${ApiConstants.baseUrl}/tasks');
    final List<dynamic> data = response.data;
    return data.map((json) => Task.fromJson(json)).toList();
  }

  @override
  Future<List<Task>> getTasksByProject(String projectId) async {
    final response = await dio.get(
      '${ApiConstants.baseUrl}/tasks',
      queryParameters: {'projectId': projectId},
    );
    final List<dynamic> data = response.data;
    return data.map((json) => Task.fromJson(json)).toList();
  }

  @override
  Future<Task> getTaskById(String id) async {
    final response = await dio.get('${ApiConstants.baseUrl}/tasks/$id');
    return Task.fromJson(response.data);
  }

  @override
  Future<Task> createTask(Map<String, dynamic> data) async {
    final response = await dio.post('${ApiConstants.baseUrl}/tasks', data: data);
    return Task.fromJson(response.data);
  }

  @override
  Future<Task> updateTask(String id, Map<String, dynamic> data) async {
    final response = await dio.put('${ApiConstants.baseUrl}/tasks/$id', data: data);
    return Task.fromJson(response.data);
  }

  @override
  Future<void> deleteTask(String id) async {
    await dio.delete('${ApiConstants.baseUrl}/tasks/$id');
  }
}
