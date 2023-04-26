import { View, Text, StatusBar, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { items } from '../../../assets/data/Model';
import Item, { MAX_HEIGHT } from "../../../component/Item/Item";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
// import { db } from '../../Firebase'
import Header from '../../../component/Header/Header';


const styles = StyleSheet.create({
 
  container: {
    height: (items.length + 1) * MAX_HEIGHT,
    backgroundColor: "black",
  }
});

const index = ({navigation}) => {
  const [data, setData] = useState([])
  const y = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y: value } }) => {
      y.value = value;
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

//   useEffect(() => {
//     const unsubscribe = db.collection("bulletinHome").onSnapshot((snapshot) =>
//     setData(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       )
//     );

//     return unsubscribe;
//   }, []);
console.log("data", data)
  return (
    <>
      <StatusBar hidden />
      <Header />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={onScroll}
        snapToInterval={MAX_HEIGHT}
       
      >
        {/* <Animated.View style={styles.container}>
        {data.map((item, index) => (
          <Item navigation={navigation} y={y} index={index} item={item} key={index} />
          ))}
          </Animated.View> */}
      </Animated.ScrollView>
 
    </>
  );
};

export default index;

