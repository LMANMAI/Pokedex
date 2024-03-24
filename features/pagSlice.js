import { createSlice } from "@reduxjs/toolkit";
export const pagSlice = createSlice({
  name: "pag",
  initialState: {
    paginador: 1,
    nextUrl: "",
    prevUrl: "",
    regiones: [],
    search: "",
    offset: 20,
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
    setRegiones: (state, action) => {
      state.regiones = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setOffsetLimit: (state, action) => {
      state.offsetlimit = action.payload;
    },
  },
});

export const {
  setnextPage,
  setPrevPage,
  setRegiones,
  setSearch,
  setOffset,
  setOffsetLimit,
} = pagSlice.actions;

export const selectPaginador = (state) => state.pag.paginador;
export const selectNextPage = (state) => state.pag.nextUrl;
export const selectPrevPage = (state) => state.pag.prevUrl;
export const selectRegiones = (state) => state.pag.regiones;
export const selectSearch = (state) => state.pag.search;
export const selectOffsetLimit = (state) => state.pag.offsetlimit;
export const selectOffset = (state) => state.pag.offset;

export default pagSlice.reducer;
