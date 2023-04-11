import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useState,useContext } from "react";
import { Icon, Divider } from "@rneui/themed";
// import OCSlogoNo from "../../../assets/OCSlogoNo.png";
import Colors from "../../../constant/Colors";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from "../../../context/AuthContext";

const index = () => {
  const navigation = useNavigation();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();
  const { logout } = useContext(AuthContext);
  const LogOutApp = () => {
    BackHandler.exitApp();
    logout()
  }
  return (
    <View style={{ backgroundColor: Colors.light, flex: 1 }}>
      <View style={styles.logoContainer}>
        {/* <Image source={OCSlogoNo} style={styles.logoImage} /> */}
      </View>

      <View style={{ flexDirection: "row", marginTop: 25, marginLeft: 10 }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 15, marginRight: 7 }}>Menu</Text>
          {/* <Text
            style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold" }}
          >
            OCC 2010
          </Text> */}
        </View>
      </View>
      <Divider width={1} inset={true} insetType="right" />
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPress={()=> navigation.navigate("Commander")}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="people"
              type="simple-line-icons"
              size={15}
              color= {Colors.blackT}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Commander
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Indevelopment")}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="profile"
              type="antdesign"
              size={15}
              color={Colors.blue}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("Developer")}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="codesquareo"
              type="antdesign"
              size={15}
              color= {Colors.money}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Developer
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity  
        onPress={() => WebBrowser.openBrowserAsync('https://play.google.com/store/apps/details?id=com.eagleman33.SecurityForcesExam')}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="system-update"
              type="material-icons"
              size={15}
              color=  {Colors.red}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Update App
            </Text>
          </View>
        </TouchableOpacity>
        <Divider width={1} inset={true} insetType="right" />
        {/* <TouchableOpacity  
        onPress={() => navigation.navigate("LoginPo")}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="login"
              type="antdesign"
              size={15}
              color=  {Colors.orange}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Log In
            </Text>
          </View>
        </TouchableOpacity>
        <Divider width={1} inset={true} insetType="right" /> */}
        {/* <TouchableOpacity  
          onPress={() => WebBrowser.openBrowserAsync('https://pm.link/ZebStore/test/PjGc6ze')}
        >
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="donate"
              type="font-awesome-5"
              size={15}
              color= {Colors.gold}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Donate a Coffee
            </Text>
          </View>
        </TouchableOpacity> */}
      </View>

      <View style={{ position: "absolute", bottom: 30, left: 20 }}>
 
        <TouchableOpacity onPress={LogOutApp}>
          <View style={{ flexDirection: "row" }}>
            <Icon
              raised
              name="logout"
              type="simple-line-icons"
              size={15}
              color={Colors.green}
            />
            <Text style={{ alignSelf: "center", marginLeft: 10 }}>
              Sign OUt
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  logoImage: {
    position: "relative",
    height: width * 0.4,
    width: width * 0.4,
    resizeMode: "contain",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
});
