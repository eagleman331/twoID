import { View, Text, Image, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import styles from "./styles";
import { SafeAreaView } from 'react-native';
import Header from '../../component/Header/Header';

const index = ({navigation}) => {
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
        <ScrollView>
          <Header />

    <View>
      <Text style={{color:"white"}}>index</Text>
    </View>
        </ScrollView>

    </SafeAreaView>
  )
}

export default index