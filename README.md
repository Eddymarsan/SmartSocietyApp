# Smart Society Frontend

A React Native Expo frontend for the Smart Society community app. This app includes login, registration, dashboard, complaint, notice, payment, and visitor screens.

## Tech Stack

- Expo / React Native
- React Navigation
- Axios
- React Native Web (for browser support)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app in web mode:
   ```bash
   npm run web
   ```

## API Configuration

Update `services/api.js` to point to your backend API URL, for example:

```js
baseURL: "http://localhost/smart_society_api/"
```

## Notes

- The app is built for both mobile and web using Expo.
- Ensure your local PHP/MySQL backend is running before signing in.
