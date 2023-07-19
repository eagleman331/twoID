import React from "react";
import { Image, StyleSheet, TouchableOpacity, View,Text, Dimensions } from "react-native";
// import YouTube from 'react-native-youtube';
// import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
import {API_YOUTUBE} from "@env"
import Item, { MAX_HEIGHT } from '../../component/Item';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get("window");
const VideoPlayer = ({route}) => {
  const { item } = route.params;
  const videoId = item.data.videoName;

  return (

 <View>
    <View>
    <WebView
  style={styles.container}
      source={{ uri: 'https://expo.dev' }}
    />
    </View>
  <Image
    style={{ height:MAX_HEIGHT/2,}}
    source={{
      uri: `http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }}
    />
 </View> 

  );
}
export default VideoPlayer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
