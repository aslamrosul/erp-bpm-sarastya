# ERPBPM Mobile

Flutter mobile application for KoneKERP BPM Sarastya

## Tech Stack

- Flutter 3.x
- Dart 3.x
- Riverpod (State Management)
- Dio (HTTP Client)
- Retrofit (API Client)
- Flutter Secure Storage

## Setup

```bash
cd frontend-mobile
flutter pub get
flutter run
```

## Build

### Android
```bash
flutter build apk --release
```

### iOS
```bash
flutter build ios --release
```

## Project Structure

```
lib/
├── core/
│   ├── constants/      # App constants
│   ├── network/        # API client
│   ├── theme/          # App theme
│   └── utils/          # Utilities
├── shared/
│   ├── widgets/        # Reusable widgets
│   ├── models/         # Shared models
│   └── extensions/     # Dart extensions
├── features/
│   ├── auth/
│   │   ├── data/
│   │   ├── presentation/
│   │   └── providers/
│   ├── dashboard/
│   ├── projects/
│   └── tasks/
└── routes/
    └── app_routes.dart
```
