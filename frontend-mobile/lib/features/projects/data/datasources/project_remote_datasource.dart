import 'package:dio/dio.dart';
import '../models/project_model.dart';
import '../../../../core/constants/api_constants.dart';

abstract class ProjectRemoteDataSource {
  Future<List<ProjectModel>> getProjects();
  Future<ProjectModel> getProjectById(String id);
  Future<ProjectModel> createProject(Map<String, dynamic> data);
  Future<ProjectModel> updateProject(String id, Map<String, dynamic> data);
  Future<void> deleteProject(String id);
}

class ProjectRemoteDataSourceImpl implements ProjectRemoteDataSource {
  final Dio dio;

  ProjectRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<ProjectModel>> getProjects() async {
    final response = await dio.get('${ApiConstants.baseUrl}/projects');
    final List<dynamic> data = response.data as List<dynamic>;
    return data.map((json) => ProjectModel.fromJson(json)).toList();
  }

  @override
  Future<ProjectModel> getProjectById(String id) async {
    final response = await dio.get('${ApiConstants.baseUrl}/projects/$id');
    return ProjectModel.fromJson(response.data);
  }

  @override
  Future<ProjectModel> createProject(Map<String, dynamic> data) async {
    final response = await dio.post('${ApiConstants.baseUrl}/projects', data: data);
    return ProjectModel.fromJson(response.data);
  }

  @override
  Future<ProjectModel> updateProject(String id, Map<String, dynamic> data) async {
    final response = await dio.put('${ApiConstants.baseUrl}/projects/$id', data: data);
    return ProjectModel.fromJson(response.data);
  }

  @override
  Future<void> deleteProject(String id) async {
    await dio.delete('${ApiConstants.baseUrl}/projects/$id');
  }
}
