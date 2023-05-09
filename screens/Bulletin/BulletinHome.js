import React, { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Genres from "./Genres";
import Rating from "./Rating";
// import { LinearGradient } from "expo-linear-gradient";
import firestore from '@react-native-firebase/firestore';
import {LogInData} from "../../assets/DataSlides/LogInSlidesData"


const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

const Backdrop = ({ data, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={data.reverse()}
        keyExtractor={(item) => item.id + "-backdrop"}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.data) {
            return null
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
            // extrapolate:'clamp'
          });
         
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                position: "absolute",
                width: translateX,
                height,
                overflow: "hidden",
              }}
            >
              <Image
                source={{ uri: item.data.fbBackground }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: "absolute",
                }}
              />
            </Animated.View>
          );
        }}
      />
      {/* <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={{
          height: BACKDROP_HEIGHT,
          width,
          position: "absolute",
          bottom: 0,
        }}
      /> */}
    </View>
  );
};

const BulletinHome = () => {
  const [movies, setMovies] = useState([]);
  //   setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
  const [bulletin, setBulletin] = useState([]);
  const [data, setData] = useState([]);

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = firestore().collection('bulletinHome').onSnapshot((snapshot) =>
    setBulletin(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);


  // useEffect(() => {
  //   const unsubscribe = firestore().collection("bulletinHome")
  //   // .orderBy("timestamp", "desc")
  //   .onSnapshot((snapshot) =>
  //     setBulletin(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     )
  //   );

  //   return unsubscribe;
  // }, []);
    useEffect(() => {
      setData([{ id: 'empty-left' }, ...bulletin, { id: 'empty-right' }])
    },[bulletin])

  return (
    <View style={styles.container}>
      <Backdrop data={data} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
  
          if (!item.data) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [100, 50, 100],
            extrapolate: "clamp",
          });
         
          return (
            <View style={{ width: ITEM_SIZE }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  transform: [{ translateY }],
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <Image    source={{ uri: item.data.facebookPic }}
                 style={styles.posterImage} />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.data.title}
                </Text>
                <Rating rating={item.data.rating} />
                <Genres genres={item.data.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={1}>
                  <Text style={{fontWeight:"bold"}}>Recruiter: </Text>{item.data.author}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={1}>
                <Text style={{fontWeight:"bold"}}>Loc: </Text>{item.data.location}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={1}>
                <Text style={{fontWeight:"bold"}}>Agency: </Text>{item.data.agency}
                </Text>
               
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                <Text style={{fontWeight:"bold"}}>Salary:  </Text>{item.data.salary}
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BulletinHome;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});
