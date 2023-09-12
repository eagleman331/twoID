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
import { ReqDocs, PhysicallyFit } from "../../../assets/DataSlides/PlazaData";
import Colors from "../../../constant/Colors";
import { Divider } from "@rneui/themed";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

//Functions
import {
  navigateToPftViewer,
  NavigateReservistReqDocs,
} from "../../../exportFunction/ReservistReqDocs";

const index = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
              data={PhysicallyFit}
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
                        onPress={() => navigateToPftViewer(item, navigation)}
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
                  <TouchableOpacity onPress={GoToYoutube}>
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
                      <Text>2DPAO Videos</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {/* );
                }}
              /> */}
            </View>
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
              Reservist Documentary Reqs:
            </Text>
            <Divider inset={true} insetType="right" width={2} />
            <View style={{ marginBottom: 20 }}>
              <FlatList
                data={ReqDocs}
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
                          onPress={() =>
                            NavigateReservistReqDocs(item, navigation)
                          }
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
                              style={{
                                width: width * 0.3,
                                height: width * 0.3,
                              }}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
