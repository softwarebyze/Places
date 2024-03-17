import React, { PropsWithChildren } from "react";
import { Text } from "react-native";
import { Chat, OverlayProvider, Streami18n } from "stream-chat-expo";

import { AuthProgressLoader } from "./AuthProgressLoader";
import { useUserData } from "../../firebase/hooks/useUserData";
import { useAuth } from "../contexts/AuthContext";
import { useChatClient } from "../hooks/useChatClient";
import { StreamChatGenerics } from "../types";

const streami18n = new Streami18n({
  language: "en",
});

export const ChatWrapper = ({ children }: PropsWithChildren<object>) => {
  // const chatClient = useChatClient();
  const {
    chatClient,
    isError,
    isLoading: isLoadingChatClient,
  } = useChatClient();

  const { user } = useAuth();

  const { data: userData, isLoading: isLoadingUserData } = useUserData();

  if (!user || !userData?.firstName || !userData?.lastName) {
    console.log(user, userData?.firstName, userData?.lastName);
    console.log("just children");
    return children;
  }

  if (!user || userData) return children;

  if (isError) {
    return <Text>Error</Text>;
  }

  if (!chatClient || isLoadingUserData || isLoadingChatClient) {
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
