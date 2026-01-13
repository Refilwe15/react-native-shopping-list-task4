import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ListPage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [items, setItems] = useState<any[]>([]);

  const addItem = () => {
    if (!itemName || !category) return;

    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: itemName,
        category,
      },
    ]);

    setItemName("");
    setCategory("");
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shopping List</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search your items..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {items.length === 0 ? (
        <View style={styles.centerContent}>
          <Image
            source={require("../assets/images/ii.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>Your list is empty</Text>
          <Text style={styles.emptyText}>
            Plan your shopping by adding items you need to buy.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={22} color="#FFF" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent>
        <KeyboardAvoidingView
          style={styles.modalBg}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalBox}>
            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>New Item</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Item Name</Text>
            <TextInput
              placeholder="e.g. Almond Milk"
              style={styles.input}
              value={itemName}
              onChangeText={setItemName}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerBox}>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
                style={styles.picker}
              >
                <Picker.Item label="Select category" value="" />
                <Picker.Item label="Groceries" value="Groceries" />
                <Picker.Item label="Cleaning" value="Cleaning" />
                <Picker.Item label="Electronics" value="Electronics" />
                <Picker.Item label="Personal Care" value="Personal Care" />
                <Picker.Item label="Household" value="Household" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={addItem}>
              <Text style={styles.saveText}>Save to List</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 60,
    marginBottom: 20,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F4F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 260,
    height: 260,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
  },
  itemCard: {
    backgroundColor: "#F9FAFB",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },
  itemCategory: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#4F46E5",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  pickerBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    marginBottom: 24,
  },
  picker: {
    height: 50,
  },
  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
