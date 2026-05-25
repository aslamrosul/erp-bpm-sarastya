import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
import '../models/user_model.dart';

abstract class AuthLocalDataSource {
  Future<void> saveToken(String token);
  Future<String?> getToken();
  Future<void> saveUser(UserModel user);
  Future<UserModel?> getUser();
  Future<void> clearAuth();
}

class AuthLocalDataSourceImpl implements AuthLocalDataSource {
  final SharedPreferences sharedPreferences;

  static const String _tokenKey = 'auth_token';
  static const String _userKey = 'user_data';

  AuthLocalDataSourceImpl({required this.sharedPreferences});

  @override
  Future<void> saveToken(String token) async {
    await sharedPreferences.setString(_tokenKey, token);
  }

  @override
  Future<String?> getToken() async {
    return sharedPreferences.getString(_tokenKey);
  }

  @override
  Future<void> saveUser(UserModel user) async {
    await sharedPreferences.setString(_userKey, json.encode(user.toJson()));
  }

  @override
  Future<UserModel?> getUser() async {
    final userJson = sharedPreferences.getString(_userKey);
    if (userJson != null) {
      return UserModel.fromJson(json.decode(userJson));
    }
    return null;
  }

  @override
  Future<void> clearAuth() async {
    await sharedPreferences.remove(_tokenKey);
    await sharedPreferences.remove(_userKey);
  }
}
