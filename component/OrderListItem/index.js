import { View, Text, Image, Pressable, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constant/Colors";
import { TaskContext } from "../../context/TaskContext";
import { useContext } from "react";

const OrderListItem = ({ item }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const { selectedTouristSpot,
    setSelectedTouristSpot} = useContext(TaskContext)

  return (
    <Pressable
      onPress={() => {
        setSelectedTouristSpot(item)
        navigation.navigate("TourDirections", {item})
      }}
      style={{
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 3,
        padding: 5,
        borderColor: Colors.money,
        width:width *.9
      }}
    >
      <Image
        source={{uri:item.data.image}}
        style={{ width: 75, height: 75, marginRight: 5, borderRadius: 5 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {item.data.author}
        </Text>
        <Text style={{ marginVertical: 5, color: Colors.blackT }}>
          Location: Camp Capinpin
        </Text>
        <Text style={{ color: Colors.gray }}>
          2 days ago &#8226; 
          {item.data.agency}
          {" "}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
