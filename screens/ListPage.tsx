import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";

export default function ListPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={20} color="#999" />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <Image
        source={require("../assets/images/list.png")}
        style={styles.img}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#534d4d",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 30,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },

  img: {
    width: "100%",
    height: 300,
    alignSelf: "center",
  },
});
