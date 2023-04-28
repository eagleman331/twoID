import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import React, { useLayoutEffect } from 'react';
import styles from "./styles";

const index = ({navigation, route}) => {
     const { item } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

  return (
    <View style={{flex:1}}>
        <Image 
        source={{uri:item.poster}}
        style={[StyleSheet.absoluteFillObject]}
        />
        <View style={{backgroundColor:"red"}}>

      <Text>index</Text>
        </View>
    </View>
  )
}

export default index