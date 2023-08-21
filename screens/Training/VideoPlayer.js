import React, { useState, useCallback, useRef } from "react";
import { Image, StyleSheet, TouchableOpacity, View,Text, Dimensions, Button, Alert } from "react-native";
// import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from 'react-native-webview';
import {API_YOUTUBE} from "@env"
import Item, { MAX_HEIGHT } from '../../component/Item';
import Constants from 'expo-constants';

const { width, height } = Dimensions.get("window");
const VideoPlayer = ({route}) => {
  const { item } = route.params;
  const videoId = item.data.videoName;

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);







  return (

 <View>
 <YoutubePlayer
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />






  {/* <Image
    style={{ height:MAX_HEIGHT/2,}}
    source={{
      uri: `http://img.youtube.com/vi/${"SA4iXmmVq74"}/maxresdefault.jpg`,
    }}
    /> */}
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
