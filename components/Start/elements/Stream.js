import { View, Text } from "react-native";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { getStreamUserToken } from "../../../firebaseConfig";

// const userId = "edJIZSIglMb34XPCimVfeROxVa43";

const Stream = () => {
  // useEffect(() => {
  //   getStreamUserToken({ userId })
  //     .then((result) => {
  //       console.log({ result });
  //       const token = result.data.token;
  //       // Use the token for authentication with Stream Chat API or SDK
  //       console.log(token);
  //       return token;
  //     })
  //     .then((token) => {
  //       console.log(token);
  //       client.connectUser({ id: userId, name: "Zack" }, token);
  //     })
  //     .catch((error) => {
  //       console.error("Error calling getStreamUserToken:", error);
  //     });

  //   // const connectUser = async () =>
  //   //   await client.connectUser({ id: userId, name: "Zack" }, userToken);
  //   // connectUser();
  // }, []);

  return (
    <View>
      <Text>Stream</Text>
    </View>
  );
};

export default Stream;
