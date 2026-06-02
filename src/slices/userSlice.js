import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import userServices from "../services/userServices";
import {showToast} from "../components/toastify/Toastify";

// Initial state for user slice
const initialState = {
    user: null,
    loading: false,
};


// Async thunk to fetch user details
export const fetchUserDetails = createAsyncThunk(
    "user/fetchDetails",
    async (_, { rejectWithValue }) => {
        try {
            const response = await userServices.getUserDetails();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)


// Create user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(fetchUserDetails.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { setUser, setUserLoading } = userSlice.actions;
export default userSlice.reducer;
