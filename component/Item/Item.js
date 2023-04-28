import React, { useContext } from "react";
import { StyleSheet, Dimensions, Alert, View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { SharedElement } from "react-navigation-shared-element";
import { TaskContext } from "../../context/TaskContext";

const { width, height } = Dimensions.get("window");
const MIN_HEIGHT = 128;
export const MAX_HEIGHT = height / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
    justifyContent: "flex-end",
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 20,
  },
  titleContainer: {
    maxHeight: MAX_HEIGHT * 0.5,
    justifyContent: "center",
    flex: 1,
  },
  mainTitle: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    padding: 32,
    transform: [{ translateY: 64 }],
    marginBottom:10
  },
  subtitle: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});



const Item = ({navigation, y, index, item, item:{data:{facebookPic}}} ) => {
  const title = "IN BOUTIQUES"
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const subtitle= item.data.author
  const subDesc= item.data.description
  const subAi = () => {
    if (subtitle !== null||undefined) {
      return subtitle.charAt(0).toUpperCase() + subtitle.slice(1)
    }else{
      return "No Author"
    }
  }
  const DescAi = () => {
    if (subDesc !== null||undefined) {
      return subDesc.charAt(0).toUpperCase() + subDesc.slice(1)
    }else{
      return "No Description"
    }
  }
  const top= 0
//   const picture= require("./../assets/butsarakham-buranaworachot-au6Gddf1pZQ-unsplash.jpg")


  const inputRange = [(index-1) * MAX_HEIGHT ,index * MAX_HEIGHT]
  const container = useAnimatedStyle(() => ({
    height: interpolate(y.value, inputRange, 
    [MIN_HEIGHT, MAX_HEIGHT],
    Extrapolate.CLAMP
    
    ),
  }))
  const lipat = () => {
    //next page
    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'trainingHome',
      // first: item,
    }))
    navigation.push("NewsDetails", { item })

  }
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value, 
      inputRange, 
    [0, 1],
    Extrapolate.CLAMP
    ),
  }))

  const pictureStyle = useAnimatedStyle(() => ({
    height: MAX_HEIGHT,
    top: interpolate(
      y.value,
      [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
      [-top, 0]
    ),
  }));
  console.log("data", item)
  return (
    <TouchableWithoutFeedback 
    // onPress={lipat}
    >
      <Animated.View style={[styles.container, container]}>
      <SharedElement
                id={`item.${item.id}.newsImage`}
                style={[styles.picture]}  >
        <Image  source={{ uri: facebookPic }} style={[styles.picture]} />
        </SharedElement>       
        {/* <View style={styles.titleContainer}>
          
          <View style={styles.mainTitle}>
            <Animated.View style={titleStyle}>
              <Text numberOfLines={3} style={styles.title}>{DescAi()}</Text>
            </Animated.View>
          </View>
        </View> */}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Item;