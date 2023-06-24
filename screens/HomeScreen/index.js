import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import styles from "./styles";
import { SafeAreaView } from 'react-native';
import { NarrativeData } from "../../assets/DataSampleWords/NarrativeData";
import { StyleSheet } from 'react-native';


const index = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const LagayIndentation = "       ";
  return (
    <SafeAreaView>
      <Image
        source={require("../../assets/Background/militaryBackground.png")}
        style={styles.imageBack}
      />
      
        <ScrollView>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View style={styles.logoImageContainer}>
            <Image source={require("../../assets/2IDSeal.png")} style={styles.logoImage} />
          </View>
        </TouchableOpacity>
        <View style={styles.firstTextContainer}>
          {NarrativeData.map((item, index) => {
            return (
              <Text style={styles.firstText} key={index}>
                {LagayIndentation}
                {item.core}
              </Text>
            );
          })}
        </View>
        </ScrollView>

    </SafeAreaView>
  )
}

export default index