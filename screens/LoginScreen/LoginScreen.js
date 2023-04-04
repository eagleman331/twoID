import React, { useEffect, useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import styles from "./style";
import { Button, Input, Image } from 'react-native';
import { StatusBar } from "expo-status-bar";



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
 
const signIn = () => {
  console.log("sign-In")
}

  return (
    <SafeAreaView style={styles.container} >
      
        <StatusBar style="light" />
      <View>
        <Image
          source={{
            uri:
              "https://cdn-icons-png.flaticon.com/512/2328/2328666.png",
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      
      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.buttonRegister}
        type="outline"
       
        title="Sign Up"
      />
      
      <View style={{height:100}} />
    </SafeAreaView>
  );
};

export default LoginScreen;