import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useEffect, useRef } from "react";
import type { StreamChat } from "stream-chat";

// Request Push Notification permission from device.
export const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
};

export const usePushNotifications = ({
  client,
  userId,
}: {
  client: StreamChat;
  userId: string;
}) => {
  const unsubscribeTokenRefreshListenerRef = useRef<() => void>();

  useEffect(() => {
    // Register FCM token with stream chat server.
    const registerPushToken = async () => {
      // unsubscribe any previous listener
      unsubscribeTokenRefreshListenerRef.current?.();
      const token = await messaging().getToken();
      const push_provider = "firebase";
      client.setLocalDevice({
        id: token,
        push_provider,
      });
      await AsyncStorage.setItem("@current_push_token", token);

      const removeOldToken = async () => {
        const oldToken = await AsyncStorage.getItem("@current_push_token");
        if (oldToken !== null) {
          await client.removeDevice(oldToken);
        }
      };

      unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(
        async (newToken) => {
          await Promise.all([
            removeOldToken(),
            client.addDevice(newToken, push_provider, userId),
            AsyncStorage.setItem("@current_push_token", newToken),
          ]);
        },
      );
    };

    const init = async () => {
      await requestPermission();
      await registerPushToken();
    };

    init();

    return () => unsubscribeTokenRefreshListenerRef.current?.();
  }, []);
};
