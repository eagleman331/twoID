import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";
import DrawerDesign from "../component/Drawer/DrawerDesign";
import { enableScreens } from "react-native-screens";
enableScreens();
import Colors from "../constant/Colors";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PlazaScreen from "../screens/PlazaStack/PlazaScreen";
import PhotoListScreen from "../screens/PhotoStackF/PhotoListScreen";
import BulletinHome from "../screens/Bulletin/BulletinHome";
import TouristMap from "../screens/TouristStack/TouristMap";
import Board from "../screens/BoardStack/Board";
import PhotoVerticalSlide from "../screens/PhotoStackF/PhotoVerticalSlide"
import { AuthContext } from "../context/AuthContext";

const LogInStackNav = createSharedElementStackNavigator();
const BulletinStackNav = createSharedElementStackNavigator();
const HomeNav = createSharedElementStackNavigator();
const PhotoNav = createSharedElementStackNavigator();
const PlazaNav = createSharedElementStackNavigator();
const FinalStackNav = createSharedElementStackNavigator();
const TouristStackNav = createSharedElementStackNavigator();

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const SpecialButton = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.customButton}
      >
        <MaterialCommunityIcons
          name="map-search-outline"
          size={40}
          color={Colors.ufoGreen}
        />
      </TouchableOpacity>
    </View>
  );
};

const options = () => ({
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400 },
    },
    close: {
      animation: "timing",
      config: { duration: 400 },
    },
  },
  cardStyleInterpolation: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
});

function HomeStack() {
  return (
    <HomeNav.Navigator initialRouteName="Home">
      <HomeNav.Screen name="Home" options={options} component={HomeScreen} />
    </HomeNav.Navigator>
  );
}
function PhotoStack() {
  return (
    <PhotoNav.Navigator initialRouteName="VerticalPhotos">
      <PhotoNav.Screen
        name="ListPhoto"
        options={options}
        component={PhotoListScreen}
      />
        <PhotoNav.Screen
        name="VerticalPhotos"
        options={options}
        component={PhotoVerticalSlide}
      />
    </PhotoNav.Navigator>
  );
}
function TouristStack() {
  return (
    <TouristStackNav.Navigator initialRouteName="TourMap">
      <TouristStackNav.Screen
        name="TourMap"
        options={options}
        component={TouristMap}
      />
    </TouristStackNav.Navigator>
  );
}
function PlazaStack() {
  return (
    <PlazaNav.Navigator initialRouteName="Plaza">
      <PlazaNav.Screen name="Plaza" options={options} component={PlazaScreen} />
    </PlazaNav.Navigator>
  );
}
function LogInStack() {
  return (
    <LogInStackNav.Navigator initialRouteName="Login">
      <LogInStackNav.Screen
        name="Login"
        options={options}
        component={LoginScreen}
      />
    </LogInStackNav.Navigator>
  );
}
function BulletinStack() {
  return (
    <BulletinStackNav.Navigator initialRouteName="Board">
      <BulletinStackNav.Screen
        name="Board"
        options={options}
        component={Board}
      />
      <BulletinStackNav.Screen
        name="BulletinHome"
        options={options}
        component={BulletinHome}
      />
    </BulletinStackNav.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tabs.Navigator initialRouteName="BulletinTab">
      <Tabs.Screen
        name="HomeTab"
        options={{
          headerShown: false,
          tabBarLabel: "Home",

          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={30} color="black" />
          ),
        }}
        component={HomeStack}
      />
      <Tabs.Screen
        name="PhotosTab"
        options={{
          headerShown: false,
          tabBarLabel: "Photos",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="photo" size={24} color="black" />
          ),
        }}
        component={PhotoStack}
      />
      <Tabs.Screen
        name="GuideTab"
        options={{
          headerShown: false,
          tabBarStyle: { display: "none" },
          tabBarLabel: "Run",
          tabBarButton: (props) => <SpecialButton {...props} />,
        }}
        component={TouristStack}
      />
      <Tabs.Screen
        name="BulletinTab"
        options={{
          headerShown: false,
          tabBarLabel: "Bulletin",
          tabBarIcon: ({ color }) => (
            <Foundation name="clipboard-pencil" size={30} color="black" />
          ),
        }}
        component={BulletinStack}
      />
      <Tabs.Screen
        name="PlazaTab"
        options={{
          headerShown: false,
          tabBarLabel: "Plaza",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hotel" size={24} color="black" />
          ),
        }}
        component={PlazaStack}
      />

      {/* <Tabs.Screen
        name="LogTab"
        options={{
          headerShown: false,
          tabBarLabel: "LogIn",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={24} color="black" />
          ),
        }}
        component={LogInStack}
      /> */}
    </Tabs.Navigator>
  );
}
const FinalNavigator = () => {
  const { emailUser, userId } = useContext(AuthContext);
  //const emailUser = "user"
  //const emailUser = null;
  return (
    <FinalStackNav.Navigator initialRouteName="LogInStack">
      {emailUser ? (
        <FinalStackNav.Screen
          name="HomeTabnavigator"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
      ) : (
        <FinalStackNav.Screen
          options={{ headerShown: false }}
          name="LogInStack"
          component={LogInStack}
        />
      )}
    </FinalStackNav.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={DrawerDesign}
      screenOptions={{
        labelStyle: { fontSize: 17, fontWeight: "bold" },
        drawerStyle: {
          backgroundColor: Colors.light,
          width: 240,
        },
      }}
      edgeWidth={100}
    >
      <Drawer.Screen
        name="Feed"
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
        component={FinalNavigator}
      />
    </Drawer.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: Colors.orange,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
  },
});
