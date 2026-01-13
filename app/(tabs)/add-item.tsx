import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function AddItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Item</Text>

      <TextInput
        placeholder="Item name"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Save Item</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "gray",
    fontWeight: "600",
  },
});
