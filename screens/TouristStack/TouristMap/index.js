import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useLayoutEffect } from 'react';
import styles from "./styles";
import { SafeAreaView } from 'react-native';
import { NarrativeData } from "../../../assets/DataSampleWords/NarrativeData";


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
        source={require("../../../assets/Background/treeBackGround.png")}
        style={styles.imageBack}
      />
        <ScrollView>
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
        </ScrollView>

    </SafeAreaView>
  )
}

export default index