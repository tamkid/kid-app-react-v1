import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constances/storage-keys';

export const registerUser = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  // Save to local storage
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

export const loginUser = createAsyncThunk('user/login', async (payload) => {
  const data = await userApi.login(payload);

  // Save to local storage
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  // return user data
  return data.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [loginUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;
