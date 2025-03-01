import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "";

interface SearchState {
  query: string;
  sortBy: SortOption;
}

const initialState: SearchState = {
  query: "",
  sortBy: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSearchQuery, setSortOption } = searchSlice.actions;
export default searchSlice.reducer;
