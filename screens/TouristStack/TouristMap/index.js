import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import { NarrativeData } from "../../../assets/DataSampleWords/NarrativeData";
import { API_GOOGLEMAPSDK } from "@env";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import Colors from "../../../constant/Colors";
import { Button, Icon } from "@rneui/themed";
import { TouchableOpacity as TouchHandler } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import OrderListItem from "../../../component/OrderListItem";
import orders from "../../../assets/data/orders.json";
import { FlatList } from "react-native";
import MapViewDirections from "react-native-maps-directions";

const index = ({ navigation }) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const [locRegion, setLocRegion] = useState(null);
  const [regionLocation, setRegionLocation] = useState(null);
  const [address, setAddress] = useState();
  const { width, height } = useWindowDimensions();
  const [visible, setVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [reloadCom, setReloadCom] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [dataMeasureLoc, setDataMeasureLoc] = useState([]);
  const [varLoc, setVarLoc] = useState(null);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyCPtufjo-8B6pTpfcgzSApt7tr2oGVJEt8";
  const GOOGLE_MAPS_APIKEY2 = "AIzaSyCwB1OIlpYvVxqlE1kUGNnV7zfJwdz--5M";

  Location.setGoogleApiKey(API_GOOGLEMAPSDK);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const bottomSheetRef = useRef(null);
  const closeApp = () => {
    navigation.goBack();
  };
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      let region = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0022,
        longitudeDelta: 0.0021,
      };
      setLocRegion(region);
      setDriverLocation(region);
    };
    getPermissions();
  }, []);

  return (
    <SafeAreaView>
      <Image
        source={require("../../../assets/Background/treeBackGround.png")}
        style={styles.imageBack}
      />
      <View style={styles.mapContainer}>
        <MapView
          style={{ height: height, width }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          followsUserLocation
          initialRegion={locRegion}
          onRegionChange={(region) => {
            setRegionLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
          onRegionChangeComplete={(region) => {
            setRegionLocation({
              latitude: region.latitude,
              longitude: region.longitude,
            });
          }}
        >
          {/* <Marker
            coordinate={{
              latitude: 14.537187129510134,
              longitude: 121.36427912861802,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
            title="marker1"
            description="description1"
          />
          <Marker
            coordinate={{
              latitude: 14.541445082627884,
              longitude: 121.36519107963379,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            }}
            title="Destination"
            description="description2"
          /> */}
          {/* <Polyline
            coordinates={[
              { latitude: 14.537187129510134, longitude: 121.36427912861802 },
              { latitude: 14.541445082627884, longitude: 121.36519107963379 },
            ]}
            strokeColor={Colors.blackT}
            strokeWidth={5}
          /> */}
          {/* <MapViewDirections
            origin={driverLocation}
            destination={{
              latitude: 14.535826644291753,
              longitude: 121.36468682438498,
            }}
            strokeWidth={10}
            strokeColor="#3FC060"
            apikey={"AIzaSyCPtufjo-8B6pTpfcgzSApt7tr2oGVJEt8"}
          /> */}
        </MapView>
        <View
          style={{
            position: "absolute",
            bottom: 100,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Button
            title={isActive ? "STOP" : "START/ RUN"}
            onPress={() => navigation.navigate("HomeTab")}
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
              padding: 10,
            }}
            titleStyle={{ fontWeight: "bold" }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            backgroundColor: Colors.gray,
            width,
            height: height * 0.15,
            top: 0,
            borderBottomEndRadius: 10,
          }}
        >
          <View style={{ alignSelf: "flex-start", position: "absolute" }}>
            <TouchHandler onPress={closeApp}>
              <Icon
                name="close"
                size={30}
                type="antdesign"
                color={Colors.clouds}
                containerStyle={{}}
              />
            </TouchHandler>
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 40 }}>
              {("0" + Math.floor(time / 3600)).slice(-2)}:
              {("0" + Math.floor((time / 60) % 60)).slice(-2)}:
              {("0" + (time % 60)).slice(-2)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              justifyContent: "space-evenly",
            }}
          >
            <Text style={{ fontSize: 15 }}>Speed: 100 km/hr</Text>
            <Text style={{ fontSize: 15 }}>Distance: 100 km</Text>
          </View>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["12%", "50%", "95%"]}
          index={0}
          handleIndicatorStyle={{ backgroundColor: "gray", width: 100 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                letterSpacing: 0.5,
                paddingBottom: 5,
              }}
            >
              Locate Tourist Spot
            </Text>
            <Text style={{ letterSpacing: 0.5, color: "grey" }}>----</Text>
            <FlatList
              data={orders}
              renderItem={({ item }) => <OrderListItem order={item} />}
            />
          </View>
        </BottomSheet>
      </View>

      {/* <ScrollView>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.logoImageContainer}>
            <Image source={require("../../../assets/junglepopoy.png")} style={styles.logoImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.firstTextContainer}>
          
              <Text style={styles.firstText} >
                Test Tourist
              </Text>
        </View>

    <View>
      <Text style={{color:"white"}}>End</Text>
    </View>
        </ScrollView> */}
    </SafeAreaView>
  );
};

export default index;
