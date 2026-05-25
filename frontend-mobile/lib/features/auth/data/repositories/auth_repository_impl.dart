import 'package:dartz/dartz.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../../../core/error/exceptions.dart';
import '../../../../core/error/failures.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_local_datasource.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;
  final AuthLocalDataSource localDataSource;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
  });

  @override
  Future<Either<Failure, User>> login(String username, String password) async {
    try {
      final response = await remoteDataSource.login(username, password);
      await localDataSource.saveToken(response.token);
      await localDataSource.saveUser(response.user);
      
      // Save user ID for later use
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('user_id', response.user.id);
      
      return Right(response.user);
    } on ServerException {
      return const Left(ServerFailure());
    } catch (e) {
      return const Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, void>> logout() async {
    try {
      await localDataSource.clearAuth();
      return const Right(null);
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<Either<Failure, User>> getCurrentUser() async {
    try {
      final user = await localDataSource.getUser();
      if (user != null) {
        return Right(user);
      } else {
        return Left(CacheFailure());
      }
    } catch (e) {
      return Left(CacheFailure());
    }
  }

  @override
  Future<bool> isLoggedIn() async {
    final token = await localDataSource.getToken();
    return token != null;
  }
}
