import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
BackHandler
  
} from "react-native";
import Colors from "../../constant/Colors";
const { width, height } = Dimensions.get("window");
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons'; 

const Header = () => {
  //   const auth = getAuth();
  const navigation = useNavigation();
  //   const { logout } = useContext(AuthContext);

  // async function signOutFireBase() {
  //     try {
  //       signOut(auth);
  //     } catch (error) {
  //         console.log('error signing out: ', error);
  //     }
  // }

  return (
    <View
      style={{
        width: width * 0.9,
        height: height * 0.1,
        // backgroundColor: "red",
        alignSelf: "center",
        borderRadius: 10,
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <View>
          <Entypo name="menu" size={40} color={Colors.gold} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> BackHandler.exitApp()}>
        <View>
          <Entypo name="log-out" size={30} color={Colors.gold} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  imageLogo: {
    height: height * 0.08,
    width: height * 0.08,

    marginLeft: 30,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 18,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20.0,
    elevation: 24,
  },
});
