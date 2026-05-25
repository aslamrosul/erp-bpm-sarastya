# Build APK Guide

## Prerequisites

- Flutter SDK installed
- Android SDK configured
- Java JDK 11+

## Build Steps

### 1. Clean and Get Dependencies

```bash
cd frontend-mobile
flutter clean
flutter pub get
```

### 2. Build APK (Debug)

```bash
flutter build apk --debug
```

### 3. Build APK (Release)

```bash
flutter build apk --release
```

### 4. Build App Bundle (for Play Store)

```bash
flutter build appbundle --release
```

## Output Location

- Debug APK: `build/app/outputs/flutter-apk/app-debug.apk`
- Release APK: `build/app/outputs/flutter-apk/app-release.apk`
- App Bundle: `build/app/outputs/bundle/release/app-release.aab`

## Signing (Production)

1. Create keystore:
```bash
keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload
```

2. Configure in `android/key.properties`:
```
storePassword=<password>
keyPassword=<password>
keyAlias=upload
storeFile=<path-to-keystore>
```

3. Update `android/app/build.gradle` to use signing config

4. Build signed APK:
```bash
flutter build apk --release
```
