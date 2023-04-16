import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productData: [], //sepete eklenecek ürünün verileri
  userInfo: null,
  loading: false,
};
export const bazarSlice = createSlice({
  name: "bazar",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const clickedItem = state.productData.find(
        (item) => item.id === action.payload.id
      ); // true or false eklenen ürün önceden var ise true döndürecek yok ise false
      clickedItem
        ? (clickedItem.quantity += action.payload.quantity)
        : state.productData.push(action.payload); // ürün daha önceden alınmış ise adetini arttır yoksa  arraye ekle
    },

    reduceToCart: (state, action) => {
      const clickedItem = state.productData.find(
        (item) => item.id === action.payload.id
      );
      clickedItem
        ? (clickedItem.quantity -= action.payload.quantity)
        : state.productData.push(action.payload);
    },

    clearCart: (state) => {
      state.productData = [];
    },
    deleteItem: (state, action) => {
      state.productData = state.productData.filter(
        (product) => product.id !== action.payload.id
      );
    },

    //Login-Logout  işlemleri

    addUser: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUser: (state) => {
      state.userInfo = null;
    },
  },
});
export const {
  addToCart,
  reduceToCart,
  deleteItem,
  clearCart,
  addUser,
  deleteUser,
} = bazarSlice.actions;
export default bazarSlice.reducer; // store da kullanılır
