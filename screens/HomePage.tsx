import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ListPage() {
  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="gray" />
      </Pressable>

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

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <Image
          source={require("../assets/images/list.png")}
          style={styles.img}
          resizeMode="contain"
        />

        {/* Empty State */}
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Oopsie! Your shopping list is empty. Start adding items.
          </Text>

          <Pressable
            style={styles.buttonContainer}
            onPress={() => router.push("/(tabs)/add-item")}
          >
            <Text  style={styles.buttonText}>Add Items <AntDesign name="plus" size={16} color="gray" /> </Text> 
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 16,
  },

  backButton: {
    position: "absolute",
    top: 20,
    left: 16,
    zIndex: 10,
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
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "gray",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  img: {
    width: 300,
    height: 300,
    marginBottom: 20,
    marginRight : 50 ,
  },

  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 120,
 
  },

  buttonContainer: {
   
    borderColor : "gray",
    borderWidth : 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 230,
  },

  buttonText: {
    color: "gray",
    fontSize: 16,
    fontWeight: "600",
  },
});
