import { useNavigation } from "@react-navigation/native";
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
const { width, height } = Dimensions.get("window");
const Commander = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);
  return (
    <View style={tw("flex-1")}>
      <ImageBackground resizeMode="stretch" style={tw("flex-1")}
      source={require("../../../assets/com2Photo.jpg")}
     >
        <TouchableOpacity
          style={[
            tw(" w-80 bg-white p-4"),
            {
              marginHorizontal: "25%",
              marginTop: height * 0.8,
              opacity: "70%",
              alignSelf: "center",
              borderRadius:5
            },
          ]}
          //to be change later test
       
        >
           <Text style={tw("font-bold text-center")}>
            
            MGEN ROBERTO S CAPULONG
          </Text>

           <Text style={tw("font-semibold text-center")}>
            Commander 2nd Infantry Division, Phil Army
          </Text>
         
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

export default Commander

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });