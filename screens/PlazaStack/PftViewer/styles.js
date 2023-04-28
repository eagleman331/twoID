import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");
import Colors from "../../../constant/Colors";

const styles = StyleSheet.create({
  imageBack: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: width,
    height: height,
  },

  logoImage: {
    position: "relative",
    height: height * 0.2,
    width: width * 0.4,
    resizeMode: "contain",
    borderRadius: 15,
  },
  logoImageContainer: {
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
  firstTextContainer: {
    alignSelf: "center",
    backgroundColor: Colors.gray,
    width: width * 0.9,
    borderRadius: 15,
    marginTop: 20,
    opacity: 0.9,
  },
  firstText: {
    padding: 10,
    opacity: 2,
  },
  socialmediaContainer: {
    alignSelf: "center",
    backgroundColor: Colors.gray,
    width: width * 0.9,
    borderRadius: 15,
    marginTop: 20,
    opacity: 0.9,
    marginBottom: 10,
  },
  socialMediaTitleContainer: {
    marginLeft:10,
    marginBottom:10
  },
  socialAllMedia: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialMedia: {},
});

export default styles;
