import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import React, { useLayoutEffect } from "react";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-native-shared-element";

const index = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();
  const { item } = route.params;
  const SPACING = 5;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SharedElement id={`item.${item.key}.image`}
       style={[StyleSheet.absoluteFillObject]}
      >
        <Image
          source={{ uri: item.poster }}
          style={[StyleSheet.absoluteFillObject]}
        />
      </SharedElement>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#000", opacity: 0.3 },
        ]}
      />
      <AntDesign
        name="close"
        size={40}
        style={{
          padding: SPACING,
          position: "absolute",
          top: SPACING,
          right: SPACING,
          zIndex: 2,
        }}
        color={"#333"}
        onPress={() => {
          navigation.goBack();
        }}
      />
  <SharedElement id="general.bg" style={[ 
            StyleSheet.absoluteFillObject,{ transform:[{translateY:height}]}
            ]} >

      <View
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: "#fff", top: - height * 0.3, padding:SPACING *2, borderRadius: 16 },
        ]}
      >
        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: "500" }}>Sample Title</Text>
          <Text>Details: Details</Text>
          <Text>Sample Details: Sample Details</Text>
          <Text>Adress: Malate</Text>
        </View>
      </View>
            </SharedElement>
    </View>
  );
};

index.sharedElement = (route) => {
    const {item} =route.params;
    return (
        {
            id:`item.${item.key}`,
        },
        {
            id:"general.bg",
        }
    );
};

export default index;
