import React, { useEffect, useRef, useState } from "react";
import Colors from "../../constant/Colors";
import { Dimensions, Text, View } from "react-native";

const { width, height } = Dimensions.get("window");

export const cardMain = (item, navigation, slidesRef) => {
  return (
    <View
      style={{
        width: width * 0.9,
        height: height * 0.8,
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
      <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10 }}>
        {item.title}
      </Text>
      <Text style={{ marginTop: 15, marginLeft: 10, marginRight: 5 }}>
        {" "}
        {item.content}
      </Text>
      <View
        style={{
          alignSelf: "baseline",
          marginLeft: width * 0.1,
          marginTop: width * 0.05,
        }}
      >
        <Text>-Filipino citizen</Text>
        <Text style={{ paddingTop: 5 }}>-With good moral character</Text>
        <Text style={{ paddingTop: 5 }}>-Physically and mentally fit</Text>
        <Text style={{ paddingTop: 5 }}>-High school graduate.</Text>
        <Text style={{ paddingTop: 5 }}>-Non-ROTC graduate.</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (completed == true) {
            navigation.goBack();
          } else {
            slidesRef?.current?.scrollToOffset({
              offset: (index + 1) * width,
              animated: true,
            });
          }
        }}
        style={{ position: "absolute", bottom: 10, right: 0 }}
      >
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
          <Text>{completed ? "Go Back" : "Skip"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
