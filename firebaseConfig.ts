import firebase from "@react-native-firebase/functions";
import { TokenProvider } from "stream-chat";

const getStreamUserToken = firebase()
  .app.functions("us-east1")
  .httpsCallable("ext-auth-chat-getStreamUserToken");

export const streamTokenProvider: TokenProvider = async () => {
  const response = await getStreamUserToken();
  return response.data;
};
