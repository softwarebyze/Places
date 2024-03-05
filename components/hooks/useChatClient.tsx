import { useEffect, useState } from "react";
import {
  StreamChat,
  OwnUserResponse,
  UserResponse,
  TokenOrProvider,
} from "stream-chat";

import { StreamChatGenerics } from "../types";

export const useChatClient = <
  SCG extends StreamChatGenerics = StreamChatGenerics,
>({
  apiKey,
  userData,
  tokenOrProvider,
}: {
  apiKey: string;
  userData?: OwnUserResponse<SCG> | UserResponse<SCG>;
  tokenOrProvider?: TokenOrProvider;
}) => {
  const [chatClient, setChatClient] = useState<StreamChat<SCG> | null>(null);

  useEffect(() => {
    const client = StreamChat.getInstance<SCG>(apiKey);

    console.log("useChatClient chatClient", chatClient);

    if (!userData) {
      return;
    }

    let didUserConnectInterrupt = false;
    const connectionPromise = client
      .connectUser(userData, tokenOrProvider)
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
  }, [apiKey, userData, tokenOrProvider]);

  return chatClient;
};
