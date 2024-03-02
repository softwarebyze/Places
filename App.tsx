import "expo-dev-client"; // https://docs.expo.dev/develop/development-builds/use-development-builds/#add-error-handling
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import { AppNavigator } from "./components/navigation/AppNavigator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <OverlayProvider>
          <AppNavigator />
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  </QueryClientProvider>
);

export default App;
