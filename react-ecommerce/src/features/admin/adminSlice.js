import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserOrders,fetchLoggedInUser,updateUser } from './userAPI';

const initialState = {
  userOrder: [],
  status: 'idle',
  userinfo:null,//this info will be used in case of detailed user info, while auth will
  //only be used for loggedInUser id etc checks.
};
//we may need more info of current order
export const fetchLoggedInUserorderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async (id) => {
    const response = await fetchLoggedInUserOrders(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id) => {
    const response = await fetchLoggedInUser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (id) => {
    const response = await updateUser(id);
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
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userinfo= action.payload;
      });
  },
});
export const selectuserorders=(state)=>state.user.userOrder;
export const selectuserinfo=(state)=>state.user.userinfo;
export const { increment } = userSlice.actions;
export default userSlice.reducer;
