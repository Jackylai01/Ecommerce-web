import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  colorMode: 'light' | 'dark';
}

const initialState: ThemeState = {
  colorMode: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleColorMode: (state) => {
      state.colorMode = state.colorMode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleColorMode } = themeSlice.actions;

export default themeSlice.reducer;
