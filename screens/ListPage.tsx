import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, editItem } from "../store/shoppingSlice";
import { AppDispatch, RootState } from "../store/store";

import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Swipeable } from "react-native-gesture-handler";

const CATEGORIES = ["Food", "Clothes", "Cosmetics"];

export default function ListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.shopping);

  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetModal = () => {
    setItemName("");
    setDescription("");
    setCategory("Food");
    setEditingId(null);
    setModalVisible(false);
  };

  const saveItem = () => {
    if (!itemName.trim()) return;

    const payload = {
      id: editingId ?? Date.now().toString(),
      name: itemName,
      description,
      category,
      purchased: false,
    };

    editingId ? dispatch(editItem(payload)) : dispatch(addItem(payload));
    resetModal();
  };

  const renderCategory = (cat: string) => {
    const filtered = items.filter((i) => i.category === cat);
    if (!filtered.length) return null;

    return (
      <View key={cat} style={{ marginBottom: 24 }}>
        <Text style={styles.sectionTitle}>{cat}</Text>

        {filtered.map((item) => (
          <Swipeable
            key={item.id}
            renderRightActions={() => (
              <Pressable
                style={styles.swipeDelete}
                onPress={() => dispatch(deleteItem(item.id))}
              >
                <Feather name="trash-2" size={20} color="#fff" />
                <Text style={styles.swipeText}>Delete</Text>
              </Pressable>
            )}
          >
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.name}</Text>

              {!!item.description && (
                <Text style={styles.cardDesc}>{item.description}</Text>
              )}

              <View style={styles.cardActions}>
                <Pressable
                  style={styles.editBtn}
                  onPress={() => {
                    setEditingId(item.id);
                    setItemName(item.name);
                    setDescription(item.description ?? "");
                    setCategory(item.category);
                    setModalVisible(true);
                  }}
                >
                  <Feather name="edit-2" size={16} color="#4F46E5" />
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteBtn}
                  onPress={() => dispatch(deleteItem(item.id))}
                >
                  <Feather name="trash-2" size={16} color="#EF4444" />
                  <Text style={styles.deleteText}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </Swipeable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="chevron-left" size={26} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Shopping List</Text>
        <View style={{ width: 26 }} />
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Image
            source={require("../assets/images/ii.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>Your shopping list is empty</Text>
        </View>
      ) : (
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => renderCategory(item)}
        />
      )}

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={22} color="#fff" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modal}>
            <View style={styles.modalHandle} />

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalTitle}>
                {editingId ? "Edit Item" : "Add Item"}
              </Text>

              <TextInput
                placeholder="Item name"
                placeholderTextColor="#9CA3AF"
                value={itemName}
                onChangeText={setItemName}
                style={styles.input}
              />

              <TextInput
                placeholder="Description (optional)"
                placeholderTextColor="#9CA3AF"
                value={description}
                onChangeText={setDescription}
                style={styles.descriptionInput}
                multiline
                textAlignVertical="top"
              />

              {/* CATEGORY */}
              <Text style={styles.label}>Category</Text>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={category}
                  onValueChange={(v) => setCategory(v)}
                  style={styles.picker}
                >
                  {CATEGORIES.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity style={styles.saveBtn} onPress={saveItem}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelBtn} onPress={resetModal}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 60,
    marginBottom: 20,
  },

  headerTitle: { fontSize: 22, fontWeight: "700" },

  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 12 },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardDesc: { marginTop: 6, color: "#6B7280" },

  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },

  editBtn: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
  },

  editText: { marginLeft: 6, color: "#4F46E5", fontWeight: "600" },

  deleteBtn: {
    flexDirection: "row",
    backgroundColor: "#FEE2E2",
    padding: 10,
    borderRadius: 10,
  },

  deleteText: { marginLeft: 6, color: "#EF4444", fontWeight: "600" },

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

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
  },

  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginBottom: 14,
    borderRadius: 2,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#FAFAFA",
  },

  descriptionInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    height: 110,
    marginBottom: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },

  label: {
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 20,
    height: Platform.OS === "ios" ? 180 : 50,
    overflow: "hidden",
  },

  picker: {
    height: Platform.OS === "ios" ? 180 : 50,
    color: "#111827",
  },

  saveBtn: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },

  cancelBtn: { marginTop: 12, alignItems: "center" },

  cancelText: { color: "#6B7280", fontWeight: "600" },

  swipeDelete: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    borderRadius: 14,
  },
  description : {
    color: "#6B7280",
    marginTop: 4,
  },
  

  swipeText: { color: "#fff", fontWeight: "700", marginTop: 4 },

  empty: { flex: 1, justifyContent: "center", alignItems: "center" },

  emptyImage: { width: 240, height: 240, marginBottom: 20 },

  emptyText: { fontSize: 16, fontWeight: "600", color: "#6B7280" },
});
