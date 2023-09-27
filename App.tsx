// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { OverlayProvider } from "stream-chat-expo";

// import Details from "@/elements/Details";
// import HomeTabs from "@/navigation/HomeTabs";
// import StartPage from "@/pages";
// import CategoryPage from "@/pages/CategoryPage";
// import ChannelInfoPage from "@/pages/ChannelInfoPage";
// import InterestsPage from "@/pages/InterestsPage";
// import JoinPlacePage from "@/pages/JoinPlacePage";
// import LocationPage from "@/pages/LocationPage";
// import LoginPage from "@/pages/LoginPage";
// import SignUpPage from "@/pages/SignUpPage";

// const Stack = createNativeStackNavigator();

// const App = () => (
//   <OverlayProvider>
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//         headerTintColor: "rgba(28, 27, 31, 1)",
//       }}
//     >
//       {/* Start */}
//       <Stack.Screen name="Start" component={StartPage} />
//       {/* Auth Modals */}
//       <Stack.Group screenOptions={{ presentation: "modal" }}>
//         <Stack.Screen name="Login" component={LoginPage} />
//         <Stack.Screen name="Signup" component={SignUpPage} />
//       </Stack.Group>
//       {/* Onboarding */}
//       <Stack.Group>
//         <Stack.Screen
//           name="Details"
//           component={Details}
//           options={{ headerShown: true }}
//         />
//         <Stack.Screen
//           name="ChooseLocation"
//           component={LocationPage}
//           options={{
//             headerShown: true,
//             headerTitle: "Choose a Location",
//           }}
//         />
//         <Stack.Screen
//           name="ChooseInterests"
//           component={InterestsPage}
//           options={{ headerShown: true, headerTitle: "Interests" }}
//         />
//       </Stack.Group>
//       {/* All the 4 tabs of the main app */}
//       <Stack.Screen name="HomeTabs" component={HomeTabs} />
//       {/* Join a Place flow */}
//       <Stack.Group>
//         <Stack.Screen
//           name="JoinPlace"
//           component={JoinPlacePage}
//           options={{ headerShown: true, headerTitle: "Join a Place" }}
//         />
//         <Stack.Screen
//           name="Category"
//           component={CategoryPage}
//           options={{ headerShown: true }}
//         />
//         <Stack.Screen
//           name="ChannelInfo"
//           component={ChannelInfoPage}
//           options={{ headerShown: true }}
//         />
//       </Stack.Group>
//     </Stack.Navigator>
//   </OverlayProvider>
// );

// export default App;
