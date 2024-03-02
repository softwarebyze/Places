import auth from "@react-native-firebase/auth";
import React, { PropsWithChildren } from "react";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";

import { AuthProgressLoader } from "./AuthProgressLoader";
import { useUserData } from "../../firebase/hooks/useUserData";
import { streamTokenProvider } from "../../firebaseConfig";
import { STREAM_API_KEY } from "../constants";
import { useChatClient } from "../hooks/useChatClient";
import { StreamChatGenerics } from "../types";

const streami18n = new Streami18n({
  language: "en",
});

export const ChatWrapper = ({ children }: PropsWithChildren<object>) => {
  const { data: userData } = useUserData();
  console.log(userData);
  const userId = auth()?.currentUser?.uid;

  const chatClient = useChatClient({
    apiKey: STREAM_API_KEY,
    userData: {
      id: userId,
      name: `${userData.first_name} ${userData.last_name}`,
    },
    tokenOrProvider: streamTokenProvider,
  });

  if (!chatClient) {
    return <AuthProgressLoader />;
  }

  return (
    <OverlayProvider<StreamChatGenerics> i18nInstance={streami18n}>
      <Chat client={chatClient} i18nInstance={streami18n} enableOfflineSupport>
        {children}
      </Chat>
    </OverlayProvider>
  );
};
