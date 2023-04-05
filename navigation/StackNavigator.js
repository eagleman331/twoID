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
  AntDesign,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";
enableScreens();
import Colors from "../constant/Colors";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import PlazaScreen from "../screens/PlazaScreen";
import News from "../screens/News";

const LogInStackNav = createSharedElementStackNavigator();
const NewStackNav = createSharedElementStackNavigator();
const HomeNav = createSharedElementStackNavigator();
const PlazaNav = createSharedElementStackNavigator();
const FinalStackNav = createSharedElementStackNavigator();

const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const SpecialButton = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={styles.customButton}
      >
        <FontAwesome5 name="running" size={40} color="black" />
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
      <HomeNav.Screen
        name="Home"
        options={options}
        component={HomeScreen}
      />
    </HomeNav.Navigator>
  );
}
function PlazaStack() {
  return (
    <PlazaNav.Navigator initialRouteName="Plaza">
      <PlazaNav.Screen
        name="Plaza"
        options={options}
        component={PlazaScreen}
      />
    </PlazaNav.Navigator>
  );
}
function NewStack() {
  return (
    <NewStackNav.Navigator initialRouteName="News">
      <NewStackNav.Screen
        name="News"
        options={options}
        component={News}
      />
    </NewStackNav.Navigator>
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
function TabNavigator() {
  return (
    <Tabs.Navigator initialRouteName="HomeTab">
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
        name="News"
        options={{
          headerShown: false,
          tabBarLabel: "Photo",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="newspaper-o" size={24}  />
          ),
        }}
        component={NewStack}
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
      <Tabs.Screen
        name="LogTab"
        options={{
          headerShown: false,
          tabBarLabel: "LogIn",
          tabBarIcon: ({ color }) => (
            <AntDesign name="login" size={24} color="black" />
          ),
        }}
        component={LogInStack}
      />
     
    </Tabs.Navigator>
  );
}
const FinalNavigator = () => {

  return (
    <FinalStackNav.Navigator>
        <FinalStackNav.Screen
          name="HomeTabnavigator"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
    
    </FinalStackNav.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Drawer.Navigator
    // drawerContent={DrawerDesign}
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
  )
}

export default StackNavigator

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: Colors.clouds,
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
  },
});