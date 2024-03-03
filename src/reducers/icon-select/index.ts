import { ReducerName } from '@enums/reducer-name';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IconSelectState = {
  active: boolean;
  iconName: string;
  currentIconClass: string;
};

type SetIconSelectAction = {
  active: boolean;
  iconName: string;
};

const initialState: IconSelectState = {
  active: false,
  iconName: '',
  currentIconClass: '',
};

const iconSelectSlice = createSlice({
  name: ReducerName.ICON_SELECT,
  initialState,
  reducers: {
    setSelectActive: (state, action: PayloadAction<SetIconSelectAction>) => {
      state.active = action.payload.active;
      state.iconName = action.payload.iconName;
    },
    selectIconClass: (state, action: PayloadAction<string>) => {
      state.currentIconClass = action.payload;
    },
    checkIconClass: (state) => {
      state.currentIconClass = state.currentIconClass;
    },
    iconSelectReset: (state) => ({ ...initialState }),
  },
});

export const {
  setSelectActive,
  selectIconClass,
  checkIconClass,
  iconSelectReset,
} = iconSelectSlice.actions;
export default iconSelectSlice.reducer;
