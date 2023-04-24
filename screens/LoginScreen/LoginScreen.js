import React, { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, Text, View, Dimensions } from "react-native";
import styles from "./style";
import { Button, Input, Image, ButtonGroup, Divider } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../context/AuthContext";
import Colors from "../../constant/Colors";
import { useContext } from "react";

import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";


const { width, height } = Dimensions.get("window");



GoogleSignin.configure({
  webClientId:
    "672052310728-ol8a7nuffbjdlpanu2qu93t091kch7rt.apps.googleusercontent.com",
});

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  async function SignInAninimously() {
    auth()
  .signInAnonymously()
  .then(() => {
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });
  }
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken, accessToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken, accessToken);
  
      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);
      user_sign_in
        .then((user) => {
          console.log(user);
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", error)
        });
    }catch (error) {
      console.error("signIn", error);
    }
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
        Alert.alert("Error", error)
      });
  }


  const signIn = () => {
    auth()
    .signInWithEmailAndPassword(email,password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        Alert.alert('error', error)
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        Alert.alert('error', error)
      }
  
      console.error(error);
    });
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <View>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/1675/1675927.png",
        }}
        style={{ width: 200, height: 200 }}
      />
    </View>
    <View style={styles.inputContainer}>
      <Input
        placeholder="Email"
        // autoFocus
        type="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        type="password"
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={signIn}
      />
    </View>
     <Button
              title="Sign In With Email"
              onPress={signIn}
              icon={{
                name: 'mail',
                type: 'AntDesign',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 20 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: Colors.orange,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: width*.7,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />
    <View style={{ flexDirection: "row", marginBottom: 5, alignItems:"center" }}>
      <View
        style={{
          width: width * 0.36,
          height: 2,
          backgroundColor: Colors.blackT,
        }}
      />
      <Text style={{paddingLeft:5, paddingRight:5, paddingTop:5}}>or</Text>
      <View
        style={{
          width: width * 0.36,
          height: 2,
          backgroundColor: Colors.blackT,
        }}
      />
    </View>
          <Button
            title="Sign in with Facebook"
            onPress={onFacebookButtonPress}
            icon={{
              name: 'facebook',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 20 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: Colors.faceBook,
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: width*.7,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          />
            {/* <Button
            title="Sign in with Google"
            onPress={onGoogleButtonPress}
            icon={{
              name: 'google',
              type: 'font-awesome',
              size: 15,
              color: 'white',
            }}
            iconContainerStyle={{ marginRight: 20 }}
            titleStyle={{ fontWeight: '700' }}
            buttonStyle={{
              backgroundColor: " rgb(221, 75, 57)",
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 10,
            }}
            containerStyle={{
              width: width*.7,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          /> */}
           <Button
              title="Login as Guest"
              onPress={SignInAninimously}
              icon={{
                name: 'user',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 20 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: Colors.blackT,
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 10,
              }}
              containerStyle={{
                width: width*.7,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
            />

    <View style={{ height: 100 }} />
  </KeyboardAvoidingView>
  );
};

export default LoginScreen;