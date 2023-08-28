import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders } from './userAPI';

const initialState = {
  userOrder: [],
  status: 'idle',
};
//we may need more info of current order
export const fetchLoggedInUserorderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserorderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserorderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be different or more from loggedin User info
        state.userOrder=action.payload;
      });
  },
});
export const selectuserorders=(state)=>state.user.userOrder;
export const { increment } = userSlice.actions;
export default userSlice.reducer;
