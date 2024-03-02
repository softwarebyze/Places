import auth from "@react-native-firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { StreamChat } from "stream-chat";
// import { DefaultStreamChatGenerics } from "stream-chat-expo";
// const client = StreamChat.getInstance<DefaultStreamChatGenerics>(
//   process.env.EXPO_PUBLIC_STREAM_API_KEY,
// );

import { getUserData } from "../users";

// const client = StreamChat.getInstanc

export const useUserData = () => {
  const queryClient = useQueryClient();
  const userId = auth().currentUser?.uid;

  return useQuery(
    {
      queryKey: ["collection", "users", userId],
      queryFn: getUserData,
    },
    queryClient,
  );
};
