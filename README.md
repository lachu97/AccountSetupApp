# AccountSetupApp

React Native (CLI) + TypeScript app that replicates the "Account setup" flow locally (no network calls).

## Features
- Registration screen replicating the referenced web form (CAPTCHA skipped).
- Inline validation (Yup + React Hook Form).
- Partial registration persistence using AsyncStorage.
- Local authentication using react-native-keychain (password stored as SHA-256 hash).
- Session persistence; logout clears secure storage.
- Lockout after 5 failed login attempts (local).
- Accessibility and keyboard handling.

## Install
1. Install dependencies:
   ```bash
   yarn install
   cd ios && pod install && cd ..
