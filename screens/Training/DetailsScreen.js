import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useRef, useState, useEffect, useContext } from "react";
import { height, tutorialSpec, width } from "../../theme";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import firestore from '@react-native-firebase/firestore';
import { TaskContext } from "../../context/TaskContext";

const { ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE } = tutorialSpec;

const zoomIn = {
  0: {
    opacity: 0,
    scale: 0,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};

const DetailsScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)
  const { primaryData, first} = completeWork
  const [data, setData] = useState([])
  const scrollX = useRef(new Animated.Value(0)).current;
  const colTrain = data.id
  const subtitle= item.data.title
  const subDesc= item.data.description
  const subAi = () => {
    if (subtitle !== null||undefined) {
      return subtitle.toUpperCase()
    }else{
      return "No Author"
    }
  }
  const DescAi = () => {
    if (subDesc !== null||undefined) {
      return subDesc.toUpperCase()
    }else{
      return "No Description"
    }
  }

  const lipat = (item) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'trainingHome',
      video: item.videoName,
    }))
    navigation.push("TrainingVideo", { item })
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  useEffect(() => {
    const unsubscribe = firestore().collection(primaryData).onSnapshot((snapshot) =>
    setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);
console.log("data", item.data.title)
  return (
    <View>
      <SharedElement
        id={`item.${item.id}.photo`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View style={[{ height: height, width: width }]}>
          <Image
            source={{ uri: item.data.image }}
            style={[StyleSheet.absoluteFillObject, { resizeMode: "cover" }]}
          />
        </View>
      </SharedElement>
      <View style={{ flexDirection: "row", top: SPACING* 2 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Ionicons
            name="chevron-back-circle-sharp"
            size={35}
            color="#fff"
          />
         
        <SharedElement id={`item.${item.id}.location`} style={styles.location}>
          <Animated.Text style={[styles.location]}>
            {item.data.location}
          </Animated.Text>
        </SharedElement>
        </TouchableOpacity>
      </View>

      <View style={{ position: "absolute", top: 300 }}>
        <Text
          style={[
            {
              fontSize: 16,
              width: "100%",
              textTransform: "uppercase",
              fontWeight: "700",
              color: "#fff",
              marginHorizontal: SPACING,
            },
          ]}
        >
          Training Video
        </Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ padding: SPACING }}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item, index }) => {
            const title = item.data.title
            const image = item.data.image
            return (
              <TouchableOpacity
              onPress={() => lipat(item)}
              >
              <Animatable.View
                animation={zoomIn}
                duration={800}
                delay={400 + index * 400}
                style={{
                  backgroundColor: "white",
                  padding: SPACING,
                  width: width * 0.33,
                  height: width * 0.6,
                  marginRight: 20,
                }}
                
              > 
              
                <Image
              
                  source={{
                    uri: image,
                  }}
                  style={{ width: "100%", height: "70%", resizeMode: "cover" }}
                />
                <Text>Title: {subAi()}</Text>
              </Animatable.View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  location: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
  
    marginLeft: SPACING*1.5,
  },
});
// DetailsScreen.sharedElements = (route, otherRoute, showing) => {
//   //const {item} = route.params;
//   return [{
//     id: `item.${item.id}.photo`
//   }, {
//     id: `item.${item.id}.location`
//   }]
// }
