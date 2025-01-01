import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGlobalState {
  mode: 'light' | 'dark'; // Restrict type to "light" or "dark"
}

const initialState: IGlobalState = {
  mode: 'light',
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
