import firebase from "@react-native-firebase/functions";

export const getStreamUserToken = firebase()
  .app.functions("us-east1")
  .httpsCallable("ext-auth-chat-getStreamUserToken");
