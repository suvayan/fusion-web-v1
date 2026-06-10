import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentServices from "../services/paymentServices";
import { showToast } from "../components/toastify/Toastify";


const initialState = {
    payeeName: "",
    payeeCountry: "",
    payeeState: "",
    payeeStateCode: "",
    payeeAddress: "",
    payeePincode: "",
    membershipCategories: []
}


export const getReceiptPayeeDetails = createAsyncThunk(
    "paymentProcess/getReceiptPayeeDetails",
    async (receiptNo, { rejectWithValue }) => {
        try {
            const response = await paymentServices.getReceiptPayeeDetails(receiptNo);
            return response?.data || [];
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const getMemberCategories = createAsyncThunk(
    "paymentProcess/getMemberCategories",
    async (_, { rejectWithValue }) => {
        try {
            const response = await paymentServices.getMemberCategories();
            return response?.data || [];
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)


export const createNewMember = createAsyncThunk(
  "paymentProcess/createNewMember", 
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await paymentServices.createNewMember(reqBody);
      if(response.success){
        showToast.success(response.message)
      }
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  } 
)


const paymentProcessSlice = createSlice({
    name: "paymentProcess",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getReceiptPayeeDetails.fulfilled, (state, action)=>{
                state.payeeName = action?.payload?.rh_payee_name ?? "";
                state.payeeCountry = action?.payload?.rh_payee_country ?? "";
                state.payeeState = action?.payload?.rh_payee_state ?? "";
                state.payeeStateCode = action?.payload?.state_code ?? "";
                state.payeeAddress = action?.payload?.rh_payee_address ?? "";
                state.payeePincode = action?.payload?.rh_payee_pincode ?? "";
            })
            .addCase(getMemberCategories.fulfilled, (state, action)=>{
                console.log(action?.payload, "mc")
                state.membershipCategories = action?.payload
            })
    }
})

export default paymentProcessSlice.reducer;