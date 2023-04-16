import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //1
import axios from "axios";

export const fetchAsyncCategories = createAsyncThunk(
  "filter/fetchAsyncCategories",
  async ({ filterCategory, sortBy, brand }) => {
    let response = "";
    if (filterCategory !== "") {
      response = await axios.get(
        `https://dummyjson.com/products${`/category/${filterCategory}`}?limit=100`
      );
    } else {
      response = await axios.get("https://dummyjson.com/products?limit=100");
    }

    if (sortBy === "lowestPrice") {
      const sortedProducts = response.data.products.sort(
        (a, b) => a.price - b.price
      );
      console.log(sortedProducts);
      return sortedProducts;
    }
    if (sortBy === "highestPrice") {
      const sortedProducts = response.data.products.sort(
        (a, b) => b.price - a.price
      );
      console.log(sortedProducts);
      return sortedProducts;
    }
    if (sortBy === "A-Z") {
      const sortedProducts = response.data.products.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      console.log(sortedProducts);
      return { sortedProducts, sortBy };
    }
    if (sortBy === "Z-A") {
      const sortedProducts = response.data.products.sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      console.log(sortedProducts);
      return sortedProducts;
    }
    if (brand) {
      const filteredProducts = response.data.products.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase()
      );
      return filteredProducts;
    }

    return response.data.products;
  }
); //2

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    categories: [
      "smartphones",
      "laptops",
      "fragrances",
      "skincare",
      "groceries",
      "home-decoration",
      "furniture",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "sunglasses",
      "automotive",
      "motorcycle",
      "lighting",
    ],
    filteredCategories: [],
    loading: false,
    selectedCategory: "",
  },
  reducers: {
    addSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    filterByCategories: (state, action) => {
      if (action.payload === "all") {
        state.filteredCategories = "";
      } else {
        state.filteredCategories = "/category/" + action.payload;
      }
    },

    clearfilterByCategories: (state) => {
      state.filteredCategories = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredCategories = action.payload;
      })
      .addCase(fetchAsyncCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  filterByCategories,
  clearfilterByCategories,
  addSelectedCategory,
  clearSelectedCategory,
} = filterSlice.actions;
export default filterSlice.reducer;

/*
{type: 'filter/filterByCategories', payload: undefined}
payload
: 
undefined
type
: 
"filter/filterByCategories"
[[Prototype]]
: 
Object
*/

