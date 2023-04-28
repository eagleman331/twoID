import { View, Text, Dimensions, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles";
import { FlatList } from "react-native";
import { LogInData } from "../../../assets/DataSlides/LogInSlidesData";
import Colors from "../../../constant/Colors";
import { useLayoutEffect } from "react";
import { Image } from "react-native";
import { Button } from "@rneui/themed";
import { StatusBar } from "expo-status-bar";
import {PushUpData} from "../../../assets/DataSlides/PftSlidesFAQs/Push-UpFAQs";
import {RunningData} from "../../../assets/DataSlides/PftSlidesFAQs/RunningFAQs";
import {SitUpData} from "../../../assets/DataSlides/PftSlidesFAQs/SitUpFAQs";
const { width, height } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width;

const index = ({ navigation, route }) => {
  const { PftData } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const dataLength = RunningData.length;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const lastCard = (index) => {
    if (dataLength == index) {
      return (
        <Button
          onPress={() => navigation.navigate("LogIn")}
          title="LOG IN"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
        />
      );
    }
  };
  
  useEffect(()=> {
    scrollX.addListener(({value}) => {
      if(Math.floor(value/ width) === dataLength - 1){
        setCompleted(true)
      }
    })
    return () => scrollX.removeListener();
  }, [])

  return (
    <View style={{ width: width, height: height  }}>
      <StatusBar style="none" />
      <Image
        source={require("../../../assets/Background/militaryBackground.png")}
        style={styles.imageBack}
      />
      <FlatList
        data={PftData}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        ref={slidesRef}
        renderItem={({ item, index }) => {
        
          return (
            <View
            key={index}
              style={{
                width: width,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: width * 0.8,
                  height: height * 0.65,
                  backgroundColor: Colors.green2,
                  borderRadius: 15,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={{ width: 170, height: 170, marginTop: 50 }}
                />
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}
                >
                  {item.title}
                </Text>
                <Text style={{ marginTop: 15, marginLeft: 10, marginRight: 5 }}>
                  {" "}
                  {item.content}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (completed == true) {
                      navigation.goBack()
                    }else{
                      slidesRef?.current?.scrollToOffset({
                        offset: (index + 1) * width,
                        animated: true,
                      });

                    }
                  }}
                style={{position: "absolute",
                    bottom: 10,
                    right: 0,
                   }}>
                <View
                  style={{
                    width: 100,
                    height: 60,
                    paddingLeft: 20,
                    justifyContent: "center",
                    borderTopLeftRadius: 30,
                    borderBottomLeftRadius: 30,
                    backgroundColor: Colors.blue,
                  }}
                >
    
                    
                  <Text>{completed ? "Go Back": "Skip"}</Text>
                </View>
                  </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {RunningData.map((item, index) => {
          const dotPosition = Animated.divide(scrollX, width);
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 17, 8],
            extrapolate: "clamp",
          });
          return (
            <View key={index}>
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: Colors.light,
                  marginRight: 5,
                  borderRadius: 10,
                  bottom: 100,
                }}
              ></Animated.View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default index;
