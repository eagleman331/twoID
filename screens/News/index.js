import { View, Text, Image, ScrollView, FlatList, Dimensions } from "react-native";
import React, { useLayoutEffect } from "react";
import styles from "./styles";
import { SafeAreaView } from "react-native";
import Header from "../../component/Header/Header";
import { NarrativeData } from "../../assets/DataSampleWords/NarrativeData";

const { width, height } = Dimensions.get("window");

const index = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/Background/militaryBackground.png")}
        style={styles.imageBack}
      />
      <View>
        <Header />

        <View style={{alignItems:"center"}}>
          <FlatList
            data={NarrativeData}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            keyExtractor={(item) => item.id}
            ListFooterComponent={<View style={{height: height*.65}}/>}
            renderItem={({ item, index }) => {
              return (
                <View style={{width:width*.9, height:height*.4, backgroundColor:"red", marginTop:20, borderRadius:10}}> 
                  <Text style={{color:"white", marginTop: 50}}>WarrenB    {item.id}</Text>
                  <Text style={{color:"white", marginTop: 50}}>Core:  {item.core}</Text>
                </View>
              )
            }}
          />
          <Text style={{ color: "white" }}>index</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
