import 'package:flutter/material.dart';
import '../features/auth/presentation/pages/splash_page.dart';
import '../features/auth/presentation/pages/login_page.dart';
import '../features/dashboard/presentation/pages/main_page.dart';
import '../features/hrm/presentation/pages/employees_page.dart';

class AppRoutes {
  static const String splash = '/';
  static const String login = '/login';
  static const String dashboard = '/dashboard';
  static const String hrmEmployees = '/hrm/employees';

  static Map<String, WidgetBuilder> get routes {
    return {
      splash: (context) => const SplashPage(),
      login: (context) => const LoginPage(),
      dashboard: (context) => const MainPage(),
      hrmEmployees: (context) => const EmployeesPage(),
    };
  }
}
