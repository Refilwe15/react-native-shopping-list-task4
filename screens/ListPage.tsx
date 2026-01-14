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
  const [editingId, setEditingId] = useState<string | null>(null);

  const addItem = () => {
    if (!itemName || !category) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, name: itemName, category }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        { id: Date.now().toString(), name: itemName, category },
      ]);
    }

    setItemName("");
    setCategory("");
    setEditingId(null);
    setModalVisible(false);
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const editItem = (item: any) => {
    setItemName(item.name);
    setCategory(item.category);
    setEditingId(item.id);
    setModalVisible(true);
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={28} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shopping List</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Feather name="search" size={18} color="#9CA3AF" />
        <TextInput
          placeholder="Search your items..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* List */}
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
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>

                {/* UPDATED CATEGORY STYLE */}
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryPillText}>
                    {item.category}
                  </Text>
                </View>
              </View>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => editItem(item)}
                >
                  <Feather name="edit-2" size={18} color="#4F46E5" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.iconBtn}
                  onPress={() => deleteItem(item.id)}
                >
                  <Feather name="trash-2" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="plus" size={22} color="#FFF" />
      </TouchableOpacity>

      {/* UPDATED MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalBg}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>
                {editingId ? "Edit Item" : "New Item"}
              </Text>
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
              >
                <Picker.Item label="Select category" value="" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Clothes" value="Clothes" />
                <Picker.Item label="Cosmetics" value="Cosmetics" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={addItem}>
              <Text style={styles.saveText}>
                {editingId ? "Update Item" : "Save to List"}
              </Text>
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
    justifyContent: "space-between",
    marginTop: 60,
    marginBottom: 20,
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
    borderWidth: 1,
    borderColor: "#c9cbce",
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },

  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

  centerContent: { flex: 1, alignItems: "center", justifyContent: "center" },

  image: { width: 260, height: 260, marginBottom: 20 },

  emptyTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8 },

  emptyText: { fontSize: 15, color: "#6B7280", textAlign: "center" },

  itemCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    elevation: 3,
  },

  itemInfo: { flex: 1 },

  itemName: { fontSize: 16, fontWeight: "700", marginBottom: 6 },

  /* 🔥 NEW CATEGORY STYLE */
  categoryPill: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#4F46E5",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 14,
  },

  categoryPillText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4F46E5",
  },

  itemActions: { flexDirection: "row" },

  iconBtn: {
    padding: 8,
    marginLeft: 10,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
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
  },

 
  modalBg: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },

  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#D1D5DB",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 14,
  },

  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: { fontSize: 20, fontWeight: "700" },

  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },

  input: {
    backgroundColor: "#F3F4F6",
    borderWidth : 1,
    borderColor: "#c6cbd4",
    fontSize: 16,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  pickerBox: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#c6cbd4",
    padding : 14,
    borderRadius: 12,
    marginBottom: 24,
  },

  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
