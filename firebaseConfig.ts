import functions from "@react-native-firebase/functions";

export const getStreamUserToken = functions().httpsCallable(
  "ext-auth-chat-getStreamUserToken",
);
