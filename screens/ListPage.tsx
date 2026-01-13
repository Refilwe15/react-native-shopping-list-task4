import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");

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

        <Text style={styles.emptyText}>
          Oopsie! Your shopping list is empty. Start adding items.
        </Text>

        <Pressable
          style={styles.buttonContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            Add Items <AntDesign name="plus" size={16} color="gray" />
          </Text>
        </Pressable>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Item</Text>

            <TextInput
              placeholder="Item name"
              style={styles.modalInput}
              value={itemName}
              onChangeText={setItemName}
            />

    <View style={styles.pickerWrapper}>
  <Picker
    selectedValue={category}
    onValueChange={(value) => setCategory(value)}
    style={styles.picker}
    dropdownIconColor="gray"
  >
    <Picker.Item label="Select category" value="" />
    <Picker.Item label="Groceries" value="groceries" />
    <Picker.Item label="Cleaning" value="cleaning" />
    <Picker.Item label="Electronics" value="electronics" />
    <Picker.Item label="Personal Care" value="personal_care" />
    <Picker.Item label="Other" value="other" />
  </Picker>
</View>


            <View style={styles.modalButtons}>
              <Pressable onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={() => {
                  console.log(itemName, category);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.saveText}>Add</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
      backgroundColor: "white",
       paddingHorizontal: 16 
    },
  backButton: { 
    position: "absolute", 
    top: 20,
     left: 16, 
     zIndex: 10
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
       color: "gray"
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
      marginTop : 180,
       marginRight: 50
     },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 140,
  },
  buttonContainer: {
    borderColor: "gray",
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 260,
  },
  buttonText: { 
    color: "gray", 
    fontSize: 16, 
    fontWeight: "600"
 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    
    fontSize: 16,
    marginBottom: 12,
  },
pickerWrapper: {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  marginBottom: 12,
  height: 50,
  justifyContent: "center",
  overflow: "hidden", 
},

picker: {
  borderWidth: 0, 
  backgroundColor: "transparent",
},


  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  cancelButton: {
     paddingVertical: 12,
      paddingHorizontal: 24 
    },
  cancelText: { 
    color: "gray",
     fontSize: 16
     },
  saveButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  saveText: { 
    color: "gray",
     fontWeight: "600" 
    },
});
