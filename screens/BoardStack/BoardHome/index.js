import { FlatList, StyleSheet, Text, View, useWindowDimensions, Animated, Image } from 'react-native'
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
const DATA = [
  {
    key:"1",
    title: "Afro vibes",
    location: "Mumbai, India",
    date: "Nov 17th, 2020",
    poster:
      "https://firebasestorage.googleapis.com/v0/b/junglepopoy-8512b.appspot.com/o/8a79d999-bf0f-41a2-a631-1037b50dd1b6?alt=media&token=dcc69be2-a087-45fc-a02f-18cd876dc84c",
  },
  {
    key:"2",
    title: "Jungle Party",
    location: "Unknown",
    date: "Sept 3rd, 2020",
    poster:
    "https://firebasestorage.googleapis.com/v0/b/junglepopoy-8512b.appspot.com/o/33a71ed8-cd66-4764-842e-7d237a6b57ee?alt=media&token=67f99400-a002-432f-bf71-03ccbfc81e31",
  },
  {
    key:"3",
    title: "4th Of July",
    location: "New York, USA",
    date: "Oct 11th, 2020",
    poster:
    "https://firebasestorage.googleapis.com/v0/b/junglepopoy-8512b.appspot.com/o/1e4f7cc7-b655-4e7d-b81c-86280432b8dc?alt=media&token=7020661f-b133-42f6-86cc-5cf565c285ad",
  },
  {
    key:"4",
    title: "Summer festival",
    location: "Bucharest, Romania",
    date: "Aug 17th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg",
  },
  {
    key:"5",
    title: "BBQ with friends",
    location: "Prague, Czech Republic",
    date: "Sept 11th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg",
  },
  {
    key:"6",
    title: "Festival music",
    location: "Berlin, Germany",
    date: "Apr 21th, 2021",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg",
  },
  {
    key:"7",
    title: "Beach House",
    location: "Liboa, Portugal",
    date: "Aug 12th, 2020",
    poster:
      "https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg",
  },
];

const index = ({navigation}) => {
  const [data, setData] = useState([])
    const { width, height } = useWindowDimensions();
    const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width;
    const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
    const SPACING = 10;
    const BACKDROP_HEIGHT = height * 0.65;

    const scrollX = useRef(new Animated.Value(0)).current;
    const [completed, setCompleted] = useState(false)
    const slidesRef = useRef(null);
    const dataLength = DATA.length;
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: false,
        });
      }, []);

      useEffect(()=> {
        scrollX.addListener(({value}) => {
          if(Math.floor(value/ width) === dataLength - 1){
            setCompleted(true)
          }
        })
        return () => scrollX.removeListener();
      }, [])

      useEffect(() => {
        const unsubscribe = firestore().collection("newsArray").onSnapshot((snapshot) =>
        setData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    
        return unsubscribe;
      }, []);
     
  return (
    <View style={{}}>
      <Animated.FlatList 
           keyExtractor={(item) => item.key}
           data={DATA}
           horizontal
           showsHorizontalScrollIndicator={false}
           bounces={false}
           decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
           renderToHardwareTextureAndroid
           contentContainerStyle={{ alignItems: "center" }}
           snapToInterval={ITEM_SIZE}
           snapToAlignment="start"
           ref={slidesRef}
           scrollEventThrottle={16}
           onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
           renderItem={({ item, index }) => {
            if (!item.poster) {
              return <View style={{ width: EMPTY_ITEM_SIZE }} />;
              
            }
  
            const inputRange = [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];
  
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [0, 50, 0],
        
            });
            console.log("data", item)
            return (
              <View style={{ width: ITEM_SIZE, marginTop:100 }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                 
                  alignItems: 'center',
                  transform: [{ translateY }],
                  // backgroundColor: 'white',
                  borderRadius: 34,
                }}
              >
                <Image
                  source={{ uri: item.poster }}
                  style={[styles.posterImage, {  height: ITEM_SIZE * 1.2}]}
                />
                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.title}
                </Text>
              </Animated.View>
            </View>
            )
           }}
      />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    // resizeMode: 'contain',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
})