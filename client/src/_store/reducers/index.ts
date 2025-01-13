import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IGlobalReducerState {
  mode: 'light' | 'dark'; // Restrict type to "light" or "dark"
  email: string;
}

const initialState: IGlobalReducerState = {
  mode: 'dark',
  email: 'rradolfh@webeden.co.uk',
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
