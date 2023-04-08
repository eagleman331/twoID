import "expo-dev-client";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthContextProvider from "./context/AuthContext";
import TaskContextProvider from "./context/TaskContext";
import StackNavigator from "./navigation/StackNavigator";

import { LoginManager, AccessToken } from "react-native-fbsdk-next";

GoogleSignin.configure({
  webClientId:
    "672052310728-ol8a7nuffbjdlpanu2qu93t091kch7rt.apps.googleusercontent.com",
});

export default function App() {
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);

    if (result.isCancelled) {
      throw "User cancelled the login process";
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    // Sign-in the user with the credential


    const user_sign_in = auth().signInWithCredential(facebookCredential);
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={[styles.container, { marginTop: 300 }]}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log("Signed in with Google!")
          )
        }
      />
      <View style={{ marginTop: 100 }}>
        <Button
          title="Facebook Sign-In"
          onPress={() =>
            onFacebookButtonPress().then(() =>
              console.log("Signed in with Facebook!")
            )
          }
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
  // return (
  //   <NavigationContainer>
  //     <GestureHandlerRootView style={styles.container}>
  //       <AuthContextProvider>
  //         <TaskContextProvider>
  //           <StackNavigator />
  //         </TaskContextProvider>
  //       </AuthContextProvider>
  //     </GestureHandlerRootView>
  //   </NavigationContainer>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
