import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ShoppingItem = {
  id: string;
  name: string;
  category: string;
  purchased: boolean;
};

const initialState: ShoppingItem[] = [];

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      return state.filter(item => item.id !== action.payload);
    },
    editItem: (state, action: PayloadAction<ShoppingItem>) => {
      return state.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.find(i => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },
    setItems: (_, action: PayloadAction<ShoppingItem[]>) => {
      return action.payload;
    }
  }
});

export const {
  addItem,
  deleteItem,
  editItem,
  togglePurchased,
  setItems
} = shoppingSlice.actions;

export default shoppingSlice.reducer;
