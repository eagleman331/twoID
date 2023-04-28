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
      source={{uri:"https://upload.wikimedia.org/wikipedia/commons/d/db/Ferdinand_R._Marcos_Jr_%28cropped%29.jpg"}}
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
            
            FERDINAND ROMUALDEZ MARCOS JR.
          </Text>

           <Text style={tw("font-semibold text-center")}>
            The President Of The Philippines
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