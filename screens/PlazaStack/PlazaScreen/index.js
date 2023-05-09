import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import Header from "../../../component/Header/Header";
import { PlazaHomeData } from "../../../assets/DataSlides/PlazaData";

import {PushUpData} from "../../../assets/DataSlides/PftSlidesFAQs/Push-UpFAQs";
import {RunningData} from "../../../assets/DataSlides/PftSlidesFAQs/RunningFAQs";
import {SitUpData} from "../../../assets/DataSlides/PftSlidesFAQs/SitUpFAQs";

import Colors from "../../../constant/Colors";
import { Divider } from "@rneui/themed";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const navigateToPftViewer = (item) => {
    const core = item.core
    if (core == "Push-Up"){
      navigation.navigate("PftViewer", {PftData : PushUpData})
    }else if(core == "Sit-Up"){
      navigation.navigate("PftViewer", {PftData :SitUpData})
    }else if(core == "Running"){
      navigation.navigate("PftViewer", {PftData : RunningData})
    }
  };
  const GoToYoutube = () => {
    openBrowserAsync("https://www.youtube.com/@2idjunglefighter");
  };
  return (
    <SafeAreaView>
      
      <Image
        source={require("../../../assets/Background/militaryBackground.png")}
        style={styles.imageBack}
      />
      <ScrollView>
        <Header />
        <View
          style={{
            alignSelf: "center",
            width: width * 0.9,
            borderRadius: 15,
            marginTop: 20,
            opacity: 0.9,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              marginLeft: 5,
              color: Colors.light,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Phisical Fitness Test FAQs:
          </Text>
          <Divider inset={true} insetType="right" width={2} />
          <View style={{ marginBottom: 20 }}>
            <FlatList
              data={PlazaHomeData}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              horizontal
              bounces={false}
              decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
              renderToHardwareTextureAndroid
              contentContainerStyle={{ alignItems: "center" }}
              renderItem={({ item, index }) => {
                return (
                  <View
                    key={index}
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}
                  >
                    <View style={styles.socialMedia}>
                      <TouchableOpacity
                      
                      onPress={() => navigateToPftViewer(item)}
                      >
                        <View
                          style={{
                            backgroundColor: Colors.light,
                            width: width * 0.4,
                            height: width * 0.4,
                            borderRadius: 9,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            source={{ uri: item.icon }}
                            style={{ width: width * 0.3, height: width * 0.3 }}
                          />
                          <Text>{item.core}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <Text
              style={{
                marginLeft: 5,
                color: Colors.light,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Phisical Fitness Video:
            </Text>
            <Divider inset={true} insetType="right" width={2} />
            <View style={{ marginBottom: 20 }}>
              {/* <FlatList
                data={NarrativeData}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item, index }) => {
                  return ( */}
              <View
                key={index}
                style={{
                  marginTop: 10,
                  marginRight: 10,
                }}
              >
                <View style={styles.socialMedia}>
                  <TouchableOpacity
                   onPress={GoToYoutube}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.light,
                        width: width * 0.4,
                        height: width * 0.4,
                        borderRadius: 9,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: "https://cdn-icons-png.flaticon.com/512/9717/9717820.png",
                        }}
                        style={{ width: width * 0.3, height: width * 0.3 }}
                      />
                      <Text>Running</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* );
                }}
              /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default index;
