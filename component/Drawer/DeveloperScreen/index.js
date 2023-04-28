import { useNavigation } from "@react-navigation/native";
import { openBrowserAsync } from "expo-web-browser";
import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import tw from "tailwind-rn";
import Colors from "../../../constant/Colors";

const { width, height } = Dimensions.get("window");
const Developer = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
      const GoToFacebook = () => {
        openBrowserAsync("https://www.facebook.com/profile.php?id=100089656629408");
      };
  return (
    <View style={tw("flex-1")}>
      <ImageBackground resizeMode="stretch" style={tw("flex-1")} 
      source={{uri:"https://images.unsplash.com/photo-1583872341575-610c859c7a57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=806&q=80"}}>
        <TouchableOpacity
        onPress={GoToFacebook}
          style={[
            tw(" w-80 bg-white p-4"),
            {
              marginHorizontal: "25%",
              marginTop: height * 0.8,
              opacity: "70%",
              alignSelf: "center",
              borderRadius:20,
              backgroundColor:Colors.faceBook
            },
          ]}
          //to be change later test
       
        >
           <Text style={[tw("font-semibold text-center"),{color:Colors.light}]}>
            The Zeb Zone
          </Text>
          <Text style={{fontWeight:"bold", alignSelf:"center", color:Colors.light}}>
            
           "Click to Follow Us on Facebook"
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Developer

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });