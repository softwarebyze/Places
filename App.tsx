import "expo-dev-client"; // https://docs.expo.dev/develop/development-builds/use-development-builds/#add-error-handling
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import RootStack from "./components/navigation/RootStack";

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <OverlayProvider>
        <RootStack />
      </OverlayProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
