import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (payload) => {
  const data = await categoryApi.getAll();
  const newData = data.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return newData;
});

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { reducer } = categorySlice;
export const getCategories = (state) => state.category.data;
export default reducer;
