import { createSlice } from "@reduxjs/toolkit";
export const pagSlice = createSlice({
  name: "pag",
  initialState: {
    paginador: 0,
    nextUrl: "",
    prevUrl: "",
  },
  reducers: {
    setnextPage: (state, action) => {
      state.nextUrl = action.payload;
      state.paginador = state.paginador + 1;
    },
    setPrevPage: (state, action) => {
      state.prevUrl = action.payload;
      state.paginador = state.paginador - 1;
    },
  },
});

export const { setnextPage, setPrevPage } = pagSlice.actions;

export const selectPaginador = (state) => state.pag.paginador;
export const selectNextPage = (state) => state.pag.nextUrl;
export const selectPrevPage = (state) => state.pag.prevUrl;

export default pagSlice.reducer;
