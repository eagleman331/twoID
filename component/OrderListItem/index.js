import { View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constant/Colors";

const OrderListItem = ({ order }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Recruitment", { id: order.id })}
      style={{
        flexDirection: "row",
        margin: 10,
        alignItems: "center",
        borderWidth: 2,
        borderRadius: 3,
        padding: 5,
        borderColor: Colors.money,
      }}
    >
      <Image
        source={{ uri: order.Restaurant.image }}
        style={{ width: 75, height: 75, marginRight: 5, borderRadius: 5 }}
      />

      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {order.Restaurant.name}
        </Text>
        <Text style={{ marginVertical: 5, color: Colors.blackT }}>
          3 items &#8226; $38.45
        </Text>
        <Text style={{ color: Colors.gray }}>
          2 days ago &#8226; {order.status}{" "}
        </Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;
