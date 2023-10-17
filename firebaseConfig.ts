import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import { initializeFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase app
export const app = initializeApp(firebaseConfig);
// persist auth state
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const functions = getFunctions(app, "us-east1");
export const getStreamUserToken = httpsCallable(
  functions,
  "ext-auth-chat-getStreamUserToken",
);
// export const revokeStreamUserToken = httpsCallable(
//   functions,
//   "ext-auth-chat-revokeStreamUserToken",
// ); // not sure if we should be using this
