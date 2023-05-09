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
import touristSpots from "../../../assets/data/touristSpots.json";
import { FlatList } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import firestore from '@react-native-firebase/firestore';
import { TaskContext } from "../../../context/TaskContext";
import { useContext } from "react";

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
  const [data, setData] = useState([])
  const [dataMeasureLoc, setDataMeasureLoc] = useState([]);
  const [varLoc, setVarLoc] = useState(null);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(null);

  const { selectedTouristSpot,
    setSelectedTouristSpot} = useContext(TaskContext)

  Location.setGoogleApiKey(API_GOOGLEMAPSDK);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const bottomSheetRef = useRef(null);
  const closeApp = () => {
    navigation.navigate("HomeTab");
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
          <Marker
            coordinate={{
              latitude: 14.536587, 
              longitude: 121.363927,    
            }}
            title="Destination"
            description="description2"
          />
          <MapViewDirections
            origin={driverLocation}
            destination={{
              latitude: 14.536587, 
              longitude: 121.363927,       
            }}
            strokeWidth={10}
            strokeColor="#3FC060"
            apikey={"AIzaSyArtqYOlP_0RHAI3e_lugJwKQXy1X9gzuE"}
          />
          
        </MapView>
        
        <View
          style={{
            position: "absolute",
            bottom: 100,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
        
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
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                letterSpacing: 0.5,
                paddingBottom: 5,
              }}
            >
              Ynares Gym
            </Text>
            <Text style={{ letterSpacing: 0.5, color: "grey" }}>----</Text>
           
            {/* <FlatList
              data={data}
              renderItem={({ item }) => <OrderListItem item={item} />}
            /> */}
          </View>
          <View>

          <View>
            <Text>Details</Text>
          </View>
          <View>
            <Text>Description</Text>
          </View>
          </View>
        
        </BottomSheet>
      </View>
      
    </SafeAreaView>
  );
};

export default index;
