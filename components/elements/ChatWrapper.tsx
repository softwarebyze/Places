import auth from "@react-native-firebase/auth";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";

import { AuthProgressLoader } from "./AuthProgressLoader";
import { useUserData } from "../../firebase/hooks/useUserData";
import { streamTokenProvider } from "../../firebaseConfig";
import { STREAM_API_KEY } from "../constants";
import { StreamChatGenerics } from "../types";

const streami18n = new Streami18n({
  language: "en",
});

export const ChatWrapper = ({ children }: PropsWithChildren<object>) => {
  const {
    data: { first_name, last_name },
  } = useUserData();
  const [chatClient, setChatClient] =
    useState<StreamChat<StreamChatGenerics> | null>(null);

  useEffect(() => {
    const userId = auth()?.currentUser?.uid;
    const chatClient = StreamChat.getInstance(STREAM_API_KEY);
    chatClient.connectUser(
      {
        id: userId,
        name: `${first_name} ${last_name}`,
      },
      streamTokenProvider,
    );

    setChatClient(chatClient);
  }, [auth, first_name, last_name]);

  if (!chatClient) {
    return <AuthProgressLoader />;
  }

  return (
    <OverlayProvider<StreamChatGenerics> i18nInstance={streami18n}>
      <Chat client={chatClient} i18nInstance={streami18n}>
        {children}
      </Chat>
    </OverlayProvider>
  );
};
