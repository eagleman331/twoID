import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import construction from "../../../assets/lottie/construction.json";
import Colors from "../../../constant/Colors";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
import BackComponent from "../../../component/BackComponent"
const index = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <BackComponent />
      <View style={styles.backgroundImage}>
        <LottieView
          style={{ width: width * 0.9 }}
          source={construction}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  backgroundImage: {
    top: 180,
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.light,
    flex: 1,
  },
  imageLogo: {
    height: height * 0.08,
    width: height * 0.08,
    marginTop: 30,
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
