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
  categoryContainer:{
    flexDirection:"row"
  },
  logoCategory:{

  
  },
  imageCatContainer:{width:width*.45, height:width*.3},
  categoryImage:{
    width:width*.25,
    height:width*.3,
    resizeMode:"stretch",
    borderRadius:5
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
    alignSelf: "center",
  },
  socialAllMedia: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  socialMedia: {},
  container: {
    flex: 1,
    flexDirection: "column",
},

box: {
    backgroundColor: "rgba(150,129,83,1)",
    width: 110,
    height: 95,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 20,
    borderRadius: 30,
    alignContent: "center",
    justifyContent: "center",

    alignSelf: "center"

},
viewBox: {
    display: "flex",
},
image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignContent: "flex-start", justifyContent: "flex-start",
},
textBox: {
    alignSelf: "center",
    color: "#00563B"
},
});

export default styles;
