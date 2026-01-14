import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addItem, deleteItem, editItem, ShoppingItem } from "../store/shoppingSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.shopping);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddItem = () => {
    if (!itemName || !category) return;

    if (editingId) {
      dispatch(
        editItem({ id: editingId, name: itemName, category, purchased: false })
      );
    } else {
      dispatch(
        addItem({ id: Date.now().toString(), name: itemName, category, purchased: false })
      );
    }

    setItemName("");
    setCategory("");
    setEditingId(null);
    setModalVisible(false);
  };

  const handleDeleteItem = (id: string) => dispatch(deleteItem(id));

  const handleEditItem = (item: ShoppingItem) => {
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
          <Feather name="chevron-left" size={28} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shopping List</Text>
        <View style={{ width: 28 }} />
      </View>

      {/* Empty State */}
      {items.length === 0 ? (
        <View style={styles.centerContent}>
          <Image
            source={require("../assets/images/ii.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.emptyTitle}>Your list is empty</Text>
          <Text style={styles.emptyText}>Add items to plan your shopping.</Text>
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

                <View
                  style={[
                    styles.categoryPill,
                    item.category === "Food" && styles.food,
                    item.category === "Clothes" && styles.clothes,
                    item.category === "Cosmetics" && styles.cosmetics,
                  ]}
                >
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>

              <View style={styles.itemActions}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => handleEditItem(item)}>
                  <Feather name="edit-2" size={18} color="#4F46E5" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconBtn} onPress={() => handleDeleteItem(item.id)}>
                  <Feather name="trash-2" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={22} color="#FFF" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.modalBg}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />

            <View style={styles.modalTop}>
              <Text style={styles.modalTitle}>{editingId ? "Edit Item" : "New Item"}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={22} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Item Name</Text>
            <TextInput
              placeholder="e.g. Milk"
              style={styles.input}
              value={itemName}
              onChangeText={setItemName}
            />

            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerBox}>
              <Picker selectedValue={category} onValueChange={(value) => setCategory(value)}>
                <Picker.Item label="Select category" value="" />
                <Picker.Item label="Food" value="Food" />
                <Picker.Item label="Clothes" value="Clothes" />
                <Picker.Item label="Cosmetics" value="Cosmetics" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleAddItem}>
              <Text style={styles.saveText}>{editingId ? "Update Item" : "Save Item"}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 60, marginBottom: 20 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#111827" },
  centerContent: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 240, height: 240, marginBottom: 20 },
  emptyTitle: { fontSize: 20, fontWeight: "700", marginBottom: 8 },
  emptyText: { fontSize: 15, color: "#6B7280", textAlign: "center" },
  itemCard: { backgroundColor: "#fff", padding: 16, borderRadius: 18, marginBottom: 14, flexDirection: "row", alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "700", marginBottom: 6, color: "#111827" },
  categoryPill: { alignSelf: "flex-start", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 14 },
  categoryText: { fontSize: 12, fontWeight: "600", color: "#fff" },
  food: { backgroundColor: "#22C55E" },
  clothes: { backgroundColor: "#3B82F6" },
  cosmetics: { backgroundColor: "#EC4899" },
  itemActions: { flexDirection: "row" },
  iconBtn: { padding: 8, marginLeft: 10, borderRadius: 20, backgroundColor: "#F3F4F6" },
  fab: { position: "absolute", bottom: 30, right: 20, backgroundColor: "#4F46E5", width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  modalBg: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.4)" },
  modalSheet: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  modalHandle: { width: 40, height: 5, backgroundColor: "#D1D5DB", borderRadius: 10, alignSelf: "center", marginBottom: 14 },
  modalTop: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: "700" },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: { backgroundColor: "#F3F4F6", fontSize: 16, borderRadius: 12, padding: 14, marginBottom: 16 },
  pickerBox: { backgroundColor: "#F3F4F6", borderRadius: 12, marginBottom: 24 },
  saveBtn: { backgroundColor: "#4F46E5", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
