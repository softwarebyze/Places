import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackParamList = {
  HomePage: undefined;
  PlacesChat: { channel: any };
  Thread: { channel: any; thread: any };
  ChannelInfo: { channelInfo: any };
  JoinPlace: { location: string };
  Category: { channels: any[] };
};

export type HomePageProps = NativeStackScreenProps<
  HomeStackParamList,
  "HomePage"
>;

export type ChannelInfoPageProps = NativeStackScreenProps<
  HomeStackParamList,
  "ChannelInfo"
>;

export type JoinPlacePageProps = NativeStackScreenProps<
  HomeStackParamList,
  "JoinPlace"
>;

export type CategoryPageProps = NativeStackScreenProps<
  HomeStackParamList,
  "Category"
>;

export type LoginPageProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type SignupPageProps = NativeStackScreenProps<
  RootStackParamList,
  "Signup"
>;

export type DetailsPageProps = NativeStackScreenProps<
  RootStackParamList,
  "Details"
>;

export type InterestsPageProps = NativeStackScreenProps<
  RootStackParamList,
  "ChooseInterests"
>;

export type PlacesChatPageProps = NativeStackScreenProps<
  HomeStackParamList,
  "PlacesChat"
>;

export type ThreadsPageProps = NativeStackScreenProps<
  HomeStackParamList,
  "Thread"
>;

export type RootStackParamList = {
  Start: undefined;
  Login: undefined;
  Signup: undefined;
  Details: {
    firstName?: string;
    lastName?: string;
  };
  ChooseLocation: undefined;
  ChooseInterests: { location: string };
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Neighbors: undefined;
  Profile: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
