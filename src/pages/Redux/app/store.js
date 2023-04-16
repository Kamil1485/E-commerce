import { configureStore } from "@reduxjs/toolkit";
import bazarReducer from "../features/bazarSlice"; //default bazarSlice.reducer
import filterReducer from "../features/filterSlice";
import storage from "redux-persist/lib/storage";
import searchReducer from "../features/searchSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Bazar slice için persistConfig oluşturma
const bazarPersistConfig = {
  key: "bazar",
  version: 1,
  storage,
};

// Filter slice için persistConfig oluşturma
const filterPersistConfig = {
  key: "filter",
  version: 1,
  storage,
};

const searchPersistConfig = {
  key: "search",
  version: 1,
  storage,
};
//*Persist ile localde verileri depolayan kütüphane

// Persist edilmiş bazar reducer
const persistedBazarReducer = persistReducer(bazarPersistConfig, bazarReducer);

// Persist edilmiş filter reducer
const persistedFilterReducer = persistReducer(
  filterPersistConfig,
  filterReducer
);

const persistedSearchReducer = persistReducer(
  searchPersistConfig,
  searchReducer
);
// Store'un yapılandırılması
export const store = configureStore({
  reducer: {
    bazar: persistedBazarReducer,
    filter: persistedFilterReducer,
    search: persistedSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor oluşturma
let persistor = persistStore(store);

export default persistor;

/*

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filteredCategories) => {
    const response = await axios.get(`https://dummyjson.com/products/${filteredCategories}`);
    return response.data;
  }
);

const initialState = {
  filteredCategories: '',
  products: [],
  loading: false,
  error: null,
};

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
});
*/
