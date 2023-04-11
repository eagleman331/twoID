import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect } from "react";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import Header from "../../../component/Header/Header";
import { NarrativeData } from "../../../assets/DataSampleWords/NarrativeData";
import Colors from "../../../constant/Colors";
import { Divider } from "@rneui/themed";
import { FlatList } from "react-native";
const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
          <StatusBar style="light" hidden />
      <Image
        source={require("../../../assets/Background/treeBackGround.png")}
        style={styles.imageBack}
      />
      <View>
        {/* <Header /> */}
        <View
          style={{
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
          <View style={{ width: width, height: height * 0.88,  }}>
            <FlatList
              data={NarrativeData}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              bounces={false}
              decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
              renderToHardwareTextureAndroid
              contentContainerStyle={{ alignItems: "center" }}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      width: width * 0.95,
                      height: width * 0.5,
                      backgroundColor: "red",
                      marginBottom: 20,
                      borderRadius:7

                    }}
                  ></View>
                );
              }}
            />
          </View>
          {/* <View style={{ marginBottom: 20 }}>
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
                      <TouchableOpacity>
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
          </View> */}

          <View>
            {/* <Text
              style={{
                marginLeft: 5,
                color: Colors.light,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              Phisical Fitness Video:
            </Text> */}
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
                {/* <View style={styles.socialMedia}>
                  <TouchableOpacity>
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
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
