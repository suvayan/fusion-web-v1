import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../services/authServices";


// Initial state for auth slice
const initialState = {
    isLoggedIn: false,
    loading: false
}



// Async thunk to check if user session is still valid
export const keepLoggedIn = createAsyncThunk(
    "auth/keepLoggedIn",
    async (_, { rejectWithValue }) => {
        try {
            // Call API to check if user session is still valid
            const response = await authServices.me();
            if (response.success) {
                return true;
            } else {
                return rejectWithValue("Session expired");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



// auth slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loadingToggling: (state, action) => {
            state.loading = action.payload;
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(keepLoggedIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(keepLoggedIn.fulfilled, (state, action) => {
                state.loading = false;
                state.isLoggedIn = action.payload;
            })
            .addCase(keepLoggedIn.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
            });
    }
})

export const { loadingToggling, setLoggedIn } = authSlice.actions;
export default authSlice.reducer;