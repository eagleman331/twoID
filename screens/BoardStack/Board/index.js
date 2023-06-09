/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
const { width } = Dimensions.get("screen");
import { EvilIcons } from "@expo/vector-icons";
import {
  FlingGestureHandler,
  Directions,
  State,
} from "react-native-gesture-handler";
import { SharedElement } from "react-native-shared-element";

// https://www.creative-flyers.com
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

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const VISIBLE_ITEMS = 3;

const OverflowItems = ({ data, scrollXAnimated }) => {
  const inputRange = [-1, 0, 1];
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT],
  });
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="black"
                    style={{ marginRight: 5 }}
                  />
                  {item.location}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

export default function index({ navigation }) {
  const [data, setData] = React.useState(DATA);
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);

  const { width, height } = useWindowDimensions();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setIndex(activeIndex);
  });

  React.useEffect(() => {
    if (index === data.length - VISIBLE_ITEMS - 1) {
      // get new data
      // fetch more data
      const newData = [...data, ...data];
      setData(newData);
    }
  });

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (ev.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
          
          <FlatList
            data={data}
            // keyExtractor={(_, index) => String(index)}
            keyExtractor={(item) => item.key}
            horizontal
            inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
              marginTop: 50,
            }}
            scrollEnabled={false}
            removeClippedSubviews={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyle = [style, { zIndex: data.length - index }];
              return (
                <View style={newStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("BoardDetails", { item })}
                >
                  <Animated.View
                    style={{
                      position: "absolute",
                      left: -ITEM_WIDTH / 2,
                      opacity,
                      transform: [
                        {
                          translateX,
                        },
                        { scale },
                      ],
                    }}
                  >
                     <SharedElement id={`item.${item.key}.image`}  >
                    <Image
                      source={{ uri: item.poster }}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        borderRadius: 14,
                      }}
                    />

            </SharedElement>
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />
          <SharedElement id="general.bg" style={[ 
            StyleSheet.absoluteFillObject,{ transform:[{translateY:height}]}
            ]} >
             
          <View
            style={[
             
              { backgroundColor: "#fff", borderRadius:16}
            ]}
          />
          </SharedElement>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4D473D",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2,
    backgroundColor:"#9D8F78"
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

  },
  overflowContainer: {
    height: OVERFLOW_HEIGHT,
    overflow: "hidden",
  },
});
