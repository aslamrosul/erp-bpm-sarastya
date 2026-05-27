# 📱 ERPBPM Mobile - Flutter Application

Mobile application untuk sistem ERPBPM menggunakan Flutter dengan Clean Architecture dan BLoC pattern.

---

## 📋 Deskripsi

Mobile app dengan fitur:
- 🔐 Authentication (Login/Logout)
- 📊 Dashboard dengan statistics
- 👥 Employee Management (HRM)
- 📁 Project Management
- ✅ Task Management
- 📈 Reports & Analytics
- 🎨 Material Design 3

---

## 🏗️ Arsitektur

### Clean Architecture + BLoC Pattern

```
lib/
├── core/                   # Core Functionality
│   ├── constants/         # App constants
│   ├── di/                # Dependency Injection
│   ├── network/           # HTTP client (Dio)
│   ├── services/          # Storage, etc
│   └── theme/             # App theme
│
├── features/              # Feature Modules
│   ├── auth/
│   │   ├── data/
│   │   │   ├── datasources/      # Remote API
│   │   │   ├── models/           # Data models
│   │   │   └── repositories/     # Repository impl
│   │   ├── domain/
│   │   │   ├── entities/         # Domain entities
│   │   │   └── repositories/     # Repository interface
│   │   └── presentation/
│   │       ├── bloc/             # BLoC state management
│   │       ├── pages/            # UI pages
│   │       └── widgets/          # UI widgets
│   │
│   ├── dashboard/        # Dashboard feature
│   ├── hrm/              # Employee management
│   ├── projects/         # Project management
│   ├── tasks/            # Task management
│   └── reports/          # Reports & analytics
│
├── routes/               # App routing
└── main.dart             # App entry point
```

### Design Patterns

- **Clean Architecture** - Separation of concerns
- **BLoC Pattern** - State management
- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - GetIt service locator

---

## 🛠️ Tech Stack

### Core

- **Framework**: Flutter 3.x
- **Language**: Dart 3.x
- **State Management**: flutter_bloc
- **Dependency Injection**: get_it

### Networking & Storage

- **HTTP Client**: dio
- **Local Storage**: shared_preferences
- **Secure Storage**: flutter_secure_storage

### UI & UX

- **Design**: Material Design 3
- **Icons**: Material Icons
- **Date Picker**: flutter_datetime_picker
- **Pull to Refresh**: flutter_refresh

---

## 🚀 Setup & Installation

### Prerequisites

- Flutter SDK 3.x
- Dart SDK 3.x
- Android Studio / VS Code
- Android SDK (untuk Android)
- Xcode (untuk iOS, Mac only)

### 1. Install Flutter

```bash
# Download Flutter SDK
# https://docs.flutter.dev/get-started/install

# Verify installation
flutter doctor
```

### 2. Clone & Install Dependencies

```bash
cd frontend-mobile

# Get dependencies
flutter pub get
```

### 3. Configuration

#### Update API URL

Edit `lib/core/constants/api_constants.dart`:

```dart
class ApiConstants {
  // Development
  static const String baseUrl = 'http://192.168.1.66:5000/api';
  
  // Production
  static const String baseUrl = 'https://erpbpm-backend.onrender.com/api';
  
  // Endpoints
  static const String login = '/auth/login';
  static const String register = '/auth/register';
  static const String employees = '/employees';
  static const String projects = '/projects';
  static const String tasks = '/tasks';
  static const String dashboard = '/dashboard/stats';
}
```

**Note**: Untuk Android emulator, gunakan `10.0.2.2` untuk localhost.
Untuk device fisik, gunakan IP address komputer Anda.

### 4. Run Application

```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device-id>

# Run in debug mode
flutter run

# Run in release mode
flutter run --release
```

---

## 📁 Project Structure

```
frontend-mobile/
├── android/              # Android native code
├── ios/                  # iOS native code
├── lib/
│   ├── core/
│   │   ├── constants/
│   │   │   ├── api_constants.dart
│   │   │   └── app_constants.dart
│   │   ├── di/
│   │   │   └── injection_container.dart    # DI setup
│   │   ├── network/
│   │   │   └── dio_client.dart             # HTTP client
│   │   ├── services/
│   │   │   └── storage_service.dart        # Local storage
│   │   └── theme/
│   │       └── app_theme.dart              # App theme
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── data/
│   │   │   │   ├── datasources/
│   │   │   │   │   └── auth_remote_datasource.dart
│   │   │   │   ├── models/
│   │   │   │   │   └── user_model.dart
│   │   │   │   └── repositories/
│   │   │   │       └── auth_repository_impl.dart
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.dart
│   │   │   │   └── repositories/
│   │   │   │       └── auth_repository.dart
│   │   │   └── presentation/
│   │   │       ├── bloc/
│   │   │       │   ├── auth_bloc.dart
│   │   │       │   ├── auth_event.dart
│   │   │       │   └── auth_state.dart
│   │   │       └── pages/
│   │   │           └── login_page.dart
│   │   │
│   │   ├── dashboard/
│   │   │   ├── data/
│   │   │   │   └── datasources/
│   │   │   │       └── dashboard_remote_datasource.dart
│   │   │   ├── domain/
│   │   │   │   └── entities/
│   │   │   │       └── dashboard_stats.dart
│   │   │   └── presentation/
│   │   │       └── pages/
│   │   │           └── dashboard_page.dart
│   │   │
│   │   ├── hrm/
│   │   │   ├── data/
│   │   │   │   └── datasources/
│   │   │   │       └── employee_remote_datasource.dart
│   │   │   ├── domain/
│   │   │   │   └── entities/
│   │   │   │       └── employee.dart
│   │   │   └── presentation/
│   │   │       └── pages/
│   │   │           ├── employees_page.dart
│   │   │           ├── employee_detail_page.dart
│   │   │           └── employee_form_page.dart
│   │   │
│   │   ├── projects/
│   │   │   └── presentation/
│   │   │       └── pages/
│   │   │           ├── projects_page.dart
│   │   │           ├── project_detail_page.dart
│   │   │           └── project_form_page.dart
│   │   │
│   │   ├── tasks/
│   │   │   └── presentation/
│   │   │       └── pages/
│   │   │           ├── tasks_page.dart
│   │   │           ├── task_detail_page.dart
│   │   │           └── task_form_page.dart
│   │   │
│   │   └── reports/
│   │       └── presentation/
│   │           └── pages/
│   │               └── reports_page.dart
│   │
│   ├── routes/
│   │   └── app_routes.dart         # Route definitions
│   │
│   └── main.dart                   # App entry point
│
├── pubspec.yaml          # Dependencies
└── README.md             # This file
```

---

## 🔐 Authentication Flow

### Login Implementation

```dart
// presentation/pages/login_page.dart
class LoginPage extends StatelessWidget {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  void _handleLogin(BuildContext context) {
    final email = _emailController.text;
    final password = _passwordController.text;
    
    // Trigger BLoC event
    context.read<AuthBloc>().add(
      LoginRequested(email: email, password: password)
    );
  }

  @override
  Widget build(BuildContext context) {
    return BlocListener<AuthBloc, AuthState>(
      listener: (context, state) {
        if (state is AuthSuccess) {
          Navigator.pushReplacementNamed(context, '/dashboard');
        } else if (state is AuthFailure) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(state.message))
          );
        }
      },
      child: Scaffold(
        body: LoginForm(
          emailController: _emailController,
          passwordController: _passwordController,
          onLogin: () => _handleLogin(context),
        ),
      ),
    );
  }
}
```

### BLoC State Management

```dart
// presentation/bloc/auth_bloc.dart
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthRepository repository;

  AuthBloc({required this.repository}) : super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
    on<LogoutRequested>(_onLogoutRequested);
  }

  Future<void> _onLoginRequested(
    LoginRequested event,
    Emitter<AuthState> emit,
  ) async {
    emit(AuthLoading());
    
    try {
      final user = await repository.login(event.email, event.password);
      emit(AuthSuccess(user: user));
    } catch (e) {
      emit(AuthFailure(message: e.toString()));
    }
  }

  Future<void> _onLogoutRequested(
    LogoutRequested event,
    Emitter<AuthState> emit,
  ) async {
    await repository.logout();
    emit(AuthInitial());
  }
}
```

---

## 📡 API Integration

### Dio Client Setup

```dart
// core/network/dio_client.dart
import 'package:dio/dio.dart';

class DioClient {
  final Dio dio;

  DioClient({required this.dio}) {
    dio.options = BaseOptions(
      baseUrl: ApiConstants.baseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
      },
    );

    // Request interceptor - Add auth token
    dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          final token = await StorageService.getToken();
          if (token != null) {
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (error, handler) {
          if (error.response?.statusCode == 401) {
            // Handle unauthorized - redirect to login
          }
          return handler.next(error);
        },
      ),
    );
  }
}
```

### Remote Data Source Example

```dart
// features/hrm/data/datasources/employee_remote_datasource.dart
abstract class EmployeeRemoteDataSource {
  Future<List<Employee>> getEmployees();
  Future<Employee> getEmployeeById(String id);
  Future<Employee> createEmployee(Map<String, dynamic> data);
  Future<Employee> updateEmployee(String id, Map<String, dynamic> data);
  Future<void> deleteEmployee(String id);
}

class EmployeeRemoteDataSourceImpl implements EmployeeRemoteDataSource {
  final Dio dio;

  EmployeeRemoteDataSourceImpl({required this.dio});

  @override
  Future<List<Employee>> getEmployees() async {
    final response = await dio.get('${ApiConstants.baseUrl}/employees');
    return (response.data as List)
        .map((json) => Employee.fromJson(json))
        .toList();
  }

  @override
  Future<Employee> createEmployee(Map<String, dynamic> data) async {
    final response = await dio.post(
      '${ApiConstants.baseUrl}/employees',
      data: data,
    );
    return Employee.fromJson(response.data);
  }

  // ... other methods
}
```

---

## 🎨 UI Components

### Custom Card Widget

```dart
class CustomCard extends StatelessWidget {
  final Widget child;
  final EdgeInsets? padding;
  final VoidCallback? onTap;

  const CustomCard({
    Key? key,
    required this.child,
    this.padding,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: padding ?? const EdgeInsets.all(16),
          child: child,
        ),
      ),
    );
  }
}
```

### Status Badge Widget

```dart
class StatusBadge extends StatelessWidget {
  final String status;

  const StatusBadge({Key? key, required this.status}) : super(key: key);

  Color _getColor() {
    switch (status.toLowerCase()) {
      case 'active':
        return Colors.green;
      case 'inactive':
        return Colors.red;
      case 'pending':
        return Colors.orange;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: _getColor().withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: _getColor().withValues(alpha: 0.3)),
      ),
      child: Text(
        status,
        style: TextStyle(
          color: _getColor(),
          fontSize: 12,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}
```

---

## 🧪 Testing

### Unit Tests

```dart
// test/features/auth/data/repositories/auth_repository_test.dart
void main() {
  late AuthRepositoryImpl repository;
  late MockAuthRemoteDataSource mockDataSource;

  setUp(() {
    mockDataSource = MockAuthRemoteDataSource();
    repository = AuthRepositoryImpl(dataSource: mockDataSource);
  });

  group('login', () {
    test('should return User when login is successful', () async {
      // Arrange
      when(mockDataSource.login(any, any))
          .thenAnswer((_) async => testUser);

      // Act
      final result = await repository.login('test@test.com', 'password');

      // Assert
      expect(result, equals(testUser));
      verify(mockDataSource.login('test@test.com', 'password'));
    });
  });
}
```

### Widget Tests

```dart
// test/features/auth/presentation/pages/login_page_test.dart
void main() {
  testWidgets('should display login form', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(home: LoginPage()),
    );

    expect(find.byType(TextField), findsNWidgets(2));
    expect(find.text('Login'), findsOneWidget);
    expect(find.byType(ElevatedButton), findsOneWidget);
  });
}
```

### Run Tests

```bash
# Run all tests
flutter test

# Run specific test file
flutter test test/features/auth/auth_test.dart

# Run with coverage
flutter test --coverage
```

---

## 📦 Build & Release

### Android APK

```bash
# Debug APK
flutter build apk --debug

# Release APK
flutter build apk --release

# Split APK by ABI (smaller size)
flutter build apk --split-per-abi
```

Output: `build/app/outputs/flutter-apk/app-release.apk`

### Android App Bundle (AAB)

```bash
flutter build appbundle --release
```

Output: `build/app/outputs/bundle/release/app-release.aab`

### iOS

```bash
# Build iOS app
flutter build ios --release

# Build IPA
flutter build ipa
```

---

## 🔧 Configuration

### Android Configuration

Edit `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        applicationId "com.erpbpm.mobile"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
```

### iOS Configuration

Edit `ios/Runner/Info.plist`:

```xml
<key>CFBundleDisplayName</key>
<string>ERPBPM</string>
<key>CFBundleVersion</key>
<string>1.0.0</string>
```

### App Icon

```bash
# Generate app icons
flutter pub run flutter_launcher_icons:main
```

### Splash Screen

```bash
# Generate splash screens
flutter pub run flutter_native_splash:create
```

---

## 🐛 Troubleshooting

### API Connection Error

**Problem**: Cannot connect to backend API

**Solution**:
1. Check API URL in `api_constants.dart`
2. For Android emulator, use `10.0.2.2` instead of `localhost`
3. For physical device, use computer's IP address
4. Ensure backend is running and accessible

### Build Errors

```bash
# Clean build
flutter clean
flutter pub get
flutter run
```

### Gradle Build Failed (Android)

```bash
cd android
./gradlew clean
cd ..
flutter run
```

### CocoaPods Issues (iOS)

```bash
cd ios
pod deintegrate
pod install
cd ..
flutter run
```

---

## 📚 Dependencies

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  
  # Dependency Injection
  get_it: ^7.6.4
  
  # Networking
  dio: ^5.4.0
  
  # Local Storage
  shared_preferences: ^2.2.2
  flutter_secure_storage: ^9.0.0
  
  # UI
  intl: ^0.18.1
  cached_network_image: ^3.3.0
  
dev_dependencies:
  flutter_test:
    sdk: flutter
  mockito: ^5.4.4
  build_runner: ^2.4.7
```

---

## 📱 Features

### Dashboard
- Statistics cards (Employees, Projects, Tasks)
- Quick actions
- Recent activities

### HRM
- Employee list dengan search
- Employee detail view
- Create/Edit employee
- Delete employee dengan confirmation

### Projects
- Project list
- Project detail dengan tasks preview
- Create/Edit project
- Delete project

### Tasks
- Task list dengan filter by status
- Task detail
- Create/Edit task
- Update task status

### Reports
- Overview statistics
- Task completion rate
- Project status breakdown
- Quick stats

---

## 🚀 Deployment

### Google Play Store

1. Build App Bundle: `flutter build appbundle --release`
2. Sign dengan keystore
3. Upload ke Google Play Console
4. Fill store listing
5. Submit for review

### Apple App Store

1. Build IPA: `flutter build ipa`
2. Open Xcode
3. Archive and upload to App Store Connect
4. Fill app information
5. Submit for review

---

## 📞 Support

- Flutter Documentation: https://docs.flutter.dev
- Dart Documentation: https://dart.dev/guides
- BLoC Documentation: https://bloclibrary.dev

---

## 🤝 Contributing

1. Follow Flutter style guide
2. Use Clean Architecture
3. Write unit tests
4. Add comments for complex logic
5. Test on both Android and iOS

---

**Mobile App by ERPBPM Team**
