import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import { dummyData2 } from "../../dummyData2";
import { SafeAreaView } from "react-native-safe-area-context";
import { tutorialSpec } from "../../theme";
import { SharedElement } from "react-navigation-shared-element";
import firestore from '@react-native-firebase/firestore';
import { TaskContext } from "../../context/TaskContext";
import Header from '../../component/Header/Header';
const { ITEM_HEIGHT, ITEM_WIDTH, RADIUS, SPACING, FULL_SIZE } = tutorialSpec;

const HomeScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([])
  const { completeWork, setCompleteWOrk } = useContext(TaskContext)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  useEffect(() => {
    const unsubscribe = firestore().collection("trainingHome").onSnapshot((snapshot) =>
    setData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return unsubscribe;
  }, []);
  const lipat = (item) => {
    //next page

    setCompleteWOrk((prevState) => ({
      ...prevState,
      primaryData: 'trainingHome',
      first: item.id,
    }))
    navigation.push("Details", { item })

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
          <Header />
      <Animated.FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        snapToInterval={FULL_SIZE}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * FULL_SIZE,
            index * FULL_SIZE,
            (index + 1) * FULL_SIZE,
          ];

          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [ITEM_WIDTH, 0, -ITEM_WIDTH],
          });

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.1, 1],
          });

          return (
            <TouchableOpacity
              onPress={() => {
                lipat(item)
              }}
              style={styles.itemContainer}
            >
              <SharedElement
                id={`item.${item.id}.photo`}
                style={[StyleSheet.absoluteFillObject]}
              >
                <View
                  style={[
                    StyleSheet.absoluteFillObject,
                    { overflow: "hidden", borderRadius: RADIUS },
                  ]}
                >
                  <Animated.Image
                    source={{ uri: item.data.image }}
                    style={[
                      StyleSheet.absoluteFillObject,
                      { resizeMode: "cover", transform: [{ scale }] },
                    ]}
                  />
                </View>
              </SharedElement>
              <SharedElement
                id={`item.${item.id}.location`}
                style={styles.location}
              >
                <Animated.Text
                  style={[styles.location, { transform: [{ translateX }] }]}
                >
                  {item.data.title}
                </Animated.Text>
              </SharedElement>
              <View style={styles.days}>
                {/* problem with data of video numbers */}
                <Text style={styles.daysValue}>{item.data.videoNum - 1}</Text>
                <Text style={styles.daysLabel}>videos</Text>
              </View>
            </TouchableOpacity>
          );
        }}

      />
    </SafeAreaView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  location: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "800",
    width: ITEM_WIDTH * 0.8,
    textTransform: "uppercase",
    position: "absolute",
    top: SPACING,
    marginLeft: SPACING,
  },
  days: {
    position: "absolute",
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
  },
  daysValue: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 18,
  },
  daysLabel: {
    color: "#fff",
    fontSize: 10,
  },
});
