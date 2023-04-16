import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //1
import axios from "axios";

export const fetchAsyncCategories = createAsyncThunk(
  "filter/fetchAsyncCategories",
  async ({ filterCategory, sortBy, brand, price }) => {
    let response = "";

    if (filterCategory !== "") {
      //category gönderilirse filtrele göndrilmezse tüm verileri göster.
      response = await axios.get(
        `https://dummyjson.com/products${`/category/${filterCategory}`}?limit=100`
      );
    } else {
      response = await axios.get("https://dummyjson.com/products?limit=100");
    }

    let filteredProducts = response.data.products;
    switch (
      sortBy // ortak paylaşılan degiskeni sortBy a göre filterele
    ) {
      case "lowestPrice":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "highestPrice":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "A-Z":
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    if (brand) {
      //ortak paylaşılan degiskeni brand a göre filterele
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    if (price) {
      //ortak paylaşılan degiskeni price a göre filterele
      filteredProducts = filteredProducts.filter(
        (product) => product.price < price
      );
    }

    return { filteredProducts, sortBy, brand, price };
  }
);

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
    brands: [
      "FREE FIRE",
      "Hemani Tea",
      "Impression of Acqua Di Gio",
      "Fog Scent Xpressio",
      "Bake Parlor Big",
      "Baking Food Items",
      "L'Oreal Paris",
      "Designer Sun Glasses",
      "Saaf & Khaas",
      "LED Lights",
      "Sneakers",
      "Maasai Sandals",
      "Vintage Apparel",
      "LouisWill",
      "Car Aux",
      "mastar watch",
      "TC Reusable",
      "Lord - Al-Rehab",
      "Golden",
      "Fashion Jewellery",
      "lightingbrilliance",
      "DADAWU",
      "Eastern Watches",
      "Bracelet",
      "Neon LED Light",
      "Ifei Home",
      "Arrivals Genuine",
      "Royal_Mirage",
      "Dermive",
      "Furniture Bed Set",
      "IELGY fashion",
      "Sandals Flip Flops",
      "W1209 DC12V",
      "Boho Decor",
      "AmnaMart",
      "Cuff Butterfly",
      "ROREC White Rice",
      "fauji",
      "The Warehouse",
      "SKMEI 9117",
      "Strap Skeleton",
      "Rubber",
      "Stainless",
      "Watch Pearls",
      "YIOSI",
      "Ratttan Outdoor",
      "Multi Purpose",
      "Soft Cotton",
      "IELGY",
      "Flying Wooden",
      "RED MICKY MOUSE..",
      "Top Sweater",
      "Luxury Digital",
      "Copenhagen Luxe",
      "luxury palace",
      "Steal Frame",
      "Fair & Clear",
      "Dry Rose",
      "Darojay",
      "Ghazi Fabric",
      "Digital Printed",
      "Professional Wear",
      "Al Munakh",
      "Synthetic Leather",
      "Naviforce",
      "OPPO",
      "Huawei",
      "Apple",
      "METRO 70cc Motorcycle - MR70",
      "Kitchen Shelf",
      "JIEPOLLY",
      "BRAVE BULL",
      "Xiangle",
      "shock absorber",
      "Infinix",
      "HP Pavilion",
      "Samsung",
      "Microsoft Surface",
    ],
    filteredCategories: [],
    loading: false,
    selectedCategory: "",
    selectedSortBy: "",
    selectedBrand: "",
    selectedPrice:5000,
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
    clearAllFilters: (state) => {
      state.selectedCategory = "";
      state.selectedSortBy = "";
      state.selectedBrand = "";
      state.selectedPrice=5000;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredCategories = action.payload.filteredProducts;
        state.selectedBrand = action.payload.brand;
        state.selectedSortBy = action.payload.sortBy;
        state.selectedPrice = action.payload.price;
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
  clearAllFilters,
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
