export default {
  expo: {
    name: "Places",
    slug: "Places",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.placesdev.places",
      googleServicesFile: process.env.GOOGLESERVICE_INFO_PLIST,
    },
    android: {
      package: "com.places.places",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["@react-native-google-signin/google-signin"],
    extra: {
      eas: {
        projectId: "5b4659d0-7e6a-4071-a149-4ccb3830ab4b",
      },
    },
  },
};
