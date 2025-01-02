import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGlobalState {
  mode: 'light' | 'dark'; // Restrict type to "light" or "dark"
  userId: string;
}

const initialState: IGlobalState = {
  mode: 'light',
  userId: '63701cc1f03239c72c00017f',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload;
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
