import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isPageLoader: false
}


const baseSlice = createSlice({
    name: "base",
    initialState,
    reducers: {
        resetPageLoader: (state, payload) => {
            state.isPageLoader = payload
        }
    }
})

export const { resetPageLoader } = baseSlice.actions;
export default baseSlice.reducer;