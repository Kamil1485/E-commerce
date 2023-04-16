import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; //1
import axios from "axios";
export const fetchAsyncSearch = createAsyncThunk(
  "filter/fetchAsyncSearch",
  async (searchValue) => {
    let response = "";
      response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchValue}`
      ); //eğer hiç bir değer girilmezse tüm ürünler gösterilecek
    return response.data.products;
  }
); //2

const searchSlice = createSlice({
  name: "search",
  initialState: {
    filterSearch: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.filterSearch = action.payload;
      })
      .addCase(fetchAsyncSearch.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default searchSlice.reducer;

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
