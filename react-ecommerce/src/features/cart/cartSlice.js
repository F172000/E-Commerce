import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './cartAPI';
import { addToCart,fetchitemsbyuserId,updateCart } from './cartAPI';

const initialState = {
  status: "idle",
  items: [],
};
export const addtoCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchallItemsAsync = createAsyncThunk(
  'cart/fetchitemsbyuserId',
  async (userId) => {
    const response = await fetchitemsbyuserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateItemsAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtoCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchallItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
      })
      .addCase(updateItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id);
        state.items[index]=action.payload;
      });
  },
});

export const { increment } = counterSlice.actions;
export const selectItems = (state) => state.cart.items;
export const selectAllItems=(state)=>state.cart.items;

export default counterSlice.reducer;
