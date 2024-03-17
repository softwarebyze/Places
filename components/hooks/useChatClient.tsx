import { useEffect, useState } from "react";
import {
  StreamChat,
  OwnUserResponse,
  UserResponse,
  TokenOrProvider,
} from "stream-chat";

import { useUserData } from "../../firebase/hooks/useUserData";
import { streamTokenProvider } from "../../firebaseConfig";
import { STREAM_API_KEY } from "../constants";
import { useAuth } from "../contexts/AuthContext";
import { StreamChatGenerics } from "../types";

export const useChatClient = <
  SCG extends StreamChatGenerics = StreamChatGenerics,
>() => {
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);
  const { data: userData } = useUserData();
  const { user } = useAuth();
  const tokenOrProvider: TokenOrProvider = streamTokenProvider;

  useEffect(() => {
    console.log({ user, userData });
    if (!user || !userData?.first_name || !userData?.last_name) {
      return;
    }
    const client = StreamChat.getInstance<SCG>(STREAM_API_KEY);
    if (client.clientID === user.uid) {
      console.log("client.clientID === user.uid", client.clientID, user.uid);
      return;
    }
    const streamUserData = {
      id: user.uid,
      name: `${userData?.first_name} ${userData?.last_name}`,
    } as UserResponse | OwnUserResponse;

    let didUserConnectInterrupt = false;
    const connectionPromise = client
      .connectUser(streamUserData, tokenOrProvider)
      .then(() => {
        if (!didUserConnectInterrupt) {
          setChatClient(client);
        }
      });

    return () => {
      didUserConnectInterrupt = true;
      setChatClient(null);
      connectionPromise
        .then(() => client.disconnectUser())
        .then(() => {
          console.log("Connection closed");
        });
    };
  }, [user, userData?.first_name, userData?.last_name]);

  return chatClient;
};
