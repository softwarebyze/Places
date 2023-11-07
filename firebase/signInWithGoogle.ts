import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

/** https://github.com/react-native-google-signin/google-signin#configureoptions-void */
GoogleSignin.configure({
  scopes: undefined, // what API you want to access on behalf of the user, default is email and profile
  webClientId: undefined, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: undefined, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: undefined, // specifies a hosted domain restriction
  forceCodeForRefreshToken: undefined, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: undefined, // [Android] specifies an account name on the device that should be used
  iosClientId: undefined, // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: undefined, // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  openIdRealm: undefined, // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: undefined, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
