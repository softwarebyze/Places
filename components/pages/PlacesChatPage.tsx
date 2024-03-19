import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
  useChatContext,
  messageActions as defaultMessageActions,
  ShareRightArrow as ShareRightArrowIcon,
} from "stream-chat-expo";

import { PlacesChatPageProps } from "../navigation/types";

const PlacesChatPage = () => {
  const route = useRoute<PlacesChatPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel } = route.params;
  const { client } = useChatContext();
  return (
    <OverlayProvider>
      <Channel
        forceAlignMessages="left"
        channel={channel}
        // custom message action docs:
        // https://getstream.io/chat/docs/sdk/reactnative/guides/customize-message-actions/#how-to-add-a-custom-message-action

        messageActions={(param) => {
          const { isMyMessage, ownCapabilities, dismissOverlay, message } =
            param;
          const actions = defaultMessageActions({ ...param });

          if (!isMyMessage) {
            actions.push({
              action: async () => {
                dismissOverlay();
                // ADD REPLY PRIVATELY HERE

                // if (message.user?.id) {
                //   if (isMuted) {
                //     console.log("unmuting user");

                //   } else {
                //     console.log("unmuting user");
                //     await client.muteUser(message.user.id);
                //   }
                // }
              },
              actionType: "replyPrivately",
              icon: <ShareRightArrowIcon />,
              title: "Reply Privately",
            });
          }

          return actions;
        }}
      >
        <MessageList
          onThreadSelect={(thread) => {
            navigator.navigate("Thread", { channel, thread });
          }}
        />
        <MessageInput />
      </Channel>
    </OverlayProvider>
  );
};

export default PlacesChatPage;
