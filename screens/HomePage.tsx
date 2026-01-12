import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>LisTly</Text>
      <Text style={styles.subtitle}>From list to cart in seconds.</Text>

      <Image
        source={require("../assets/images/shop.png")}
        style={styles.img}
        contentFit="cover"
      />

      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push("/(tabs)/list")}
      >
        <Text style={styles.buttonText}>
          Get Started 
        </Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#534d4d",
  },
  subtitle: { 
    fontSize: 16,
    fontFamily: "italic",
    color: "#534d4d" 
},
  img: {
     width: 400,
      height: 400,
       marginTop: 60, 
       marginLeft: 50
     },
  buttonContainer: {
    backgroundColor: "#534d4d",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: { color: "white",
     fontSize: 16,
      fontWeight: "bold" 
    },
});
