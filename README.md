
# 🚀 MccSoftRNTemplate

A modern, scalable and well-structured React Native boilerplate using **React Native CLI** (no Expo) — designed to speed up development of mobile apps, especially in healthcare or research domains.

## 📦 Tech Stack

This template comes preconfigured with:

- **React Native CLI (Bare Workflow)** – no Expo
- **TypeScript**
- **Redux Toolkit (RTK)**
- **React Navigation** (`@react-navigation/native`, `native-stack`)
- **Firebase Messaging** (`@react-native-firebase/messaging`)
- **React Native Config** for environment variables
- **Dark/Light Theme** via `Appearance` API
- **BootSplash** for native splash screen
- **i18next** for localization (with `react-i18next`)
- **TanStack React Query** for data fetching
- **React Native Modals**
- **Date-fns**
- **NetInfo** for connection status
- **SafeAreaContext**
- **Reanimated & Gesture Handler**
- **Keyboard Controller**
- **AsyncStorage**
- **Jest** for unit testing

## 📁 Folder Structure

```
MccSoftRNTemplate/
├── android/               # Native Android project (Kotlin)
├── ios/                   # Native iOS project (Swift)
├── src/
│   ├── shared/            # Shared modules and utilities
│   │   ├── theme/         # Theme context and styles
│   │   ├── firebase/      # Firebase messaging config
│   │   └── i18n/          # i18n setup
│   ├── navigation/        # React Navigation setup
│   ├── screens/           # App screens
│   ├── store/             # Redux Toolkit store & slices
│   └── providers.tsx      # Root app providers
├── .env                   # Environment variables
├── App.tsx                # Entry point
├── jest.config.js         # Test config
└── README.md
```

## 🚀 Getting Started

### 1. Clone and install dependencies

```bash
yarn install
```

### 2. Setup environment variables

Create a `.env` file:

```env
API_URL=https://api.example.com
```

~~### 3. Firebase setup~~

~~- Add `google-services.json` to `android/app`~~

~~- Add `GoogleService-Info.plist` to `ios/` via Xcode~~

### 4. iOS Setup

```bash
cd ios && pod install && cd ..
```

### 5. Run the app

```bash
# Android
yarn android

# iOS
yarn ios
```

## 🧪 Running Tests

```bash
yarn test
```

## 💬 Localization

Supports multiple languages using `i18next`. Add new locales in `src/shared/i18n/locales`.

## 🎨 Theming

Uses system-based dark/light theme with `Appearance`. You can override colors in:

```
src/shared/theme/colors.ts
```

## 🔐 Firebase Messaging

_will be implemented in future_

