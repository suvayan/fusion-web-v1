import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentServices from "../services/paymentServices";
import { showToast } from "../components/toastify/Toastify";

export const createPaymentReceive = createAsyncThunk(
  "payment/createPaymentReceive",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentServices.paymentReceival(paymentData);
      console.log("Payment receive response:", response);
      showToast.success("Payment received successfully!");
      return response?.data || {};
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  },
);

export const fetchPaymentReceiveDetails = createAsyncThunk(
  "payment/fetchPaymentReceiveDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentServices.paymentReceivalDetails();
      return response || [];
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  },
);
// --------------Nupur 24th April----------------
export const fetchPaymentReceivalById = createAsyncThunk(
  "payment/fetchPaymentReceivalById",
  async (receiptNo, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getPaymentReceivalById(receiptNo);
      return response.data; // ✅ IMPORTANT FIX
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

// ------------------------------------------------------


// ----nupur-------//
// export const updatePaymentReceipt = createAsyncThunk(
//   "payment/updateReceipt",
//   async (data) => {
//     const response = await api.put(
//       `/payment-receipt/${data.rh_receipt_no}`,
//       data,
//     );

//     return response.data;
//   },
// );
// --------------------

// --------------------2nd May 2026-----------------
export const updatePaymentReceival = createAsyncThunk(
  "payment/updatePaymentReceival",
  async ({ receiptNo, payload }, { rejectWithValue }) => {
    try {
      const response = await paymentServices.updatePaymentReceival(
        receiptNo,
        payload
      );

      showToast.success("Payment updated successfully!");
      return response?.data || {};
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  }
);
// ----------------------------------------------------

export const fetchAutoloadEnterpriseUnit = createAsyncThunk(
  "payment/fetchAutoloadEnterpriseUnit",
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getAutoloadEnterpriseUnit();
      return response?.data || {};
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const fetchGSTAndStateCodeDetails = createAsyncThunk(
  "payment/fetchGSTAndStateCodeDetails",
  async (enterprise_id, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getGSTAndStateCodeDetails(enterprise_id);
      return response?.data || {};
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  }
);

export const fetchCustomerName = createAsyncThunk(
  "payment/fetchCustomerName",
   async (customer, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getCustomerName(customer);
      return response?.data || [];
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
   }
);

export const fetchCustomerDetails = createAsyncThunk(
  "payment/fetchCustomerDetails", 
  async (customer, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getCustomerDetails(customer);
      return response?.data || [];
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  } 
)

export const fetchProformaInvoiceList = createAsyncThunk(
  "payment/fetchProformaInvoiceList", 
  async (_, { rejectWithValue }) => {
    try {
      const response = await paymentServices.getProformaInvoiceList();
      return response?.data || [];
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  } 
)

export const createProformaInvoice = createAsyncThunk(
  "payment/createProformaInvoice", 
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await paymentServices.createProformaInvoice(reqBody);
      if(response.success){
        showToast.success(response.message)
      }
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  } 
)


// initial state for payment receive slice

const initialState = {
  apiCallStatus: false,
  submitStatus: false,
  isLoading: false,

  paymentViewStatus: "idle",
  paymentReceiveStatus: "idle",
  paymentReceiveError: null,
  paymentReceiveDetails: [],
  paymentReceiveById: null,
  paymentByIdStatus: "idle",
  autoloadEnterpriseUnit: "",
  gstin: "", 
  stateName: "",
  stateCode: "",
  customerNames: [],
  customerCode: "",
  customerType: "",
  customerGstin: "",
  customerAddress: "",
  performaInvoiceList: []
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentReceiveById: (state) => {
      state.paymentReceiveById = null;
    },
  },
  extraReducers: (builder) => {
  builder
    .addCase(fetchPaymentReceiveDetails.pending, (state) => {
      state.paymentViewStatus = "loading";
      state.paymentReceiveError = null;
    })
    .addCase(fetchPaymentReceiveDetails.fulfilled, (state, action) => {
      state.paymentViewStatus = "succeeded";
      state.paymentReceiveDetails = action.payload.data;
    })
    .addCase(fetchPaymentReceiveDetails.rejected, (state, action) => {
      state.paymentViewStatus = "failed";
      state.paymentReceiveError = action.payload;
      state.paymentReceiveDetails = [];
    })

    

    // ================================
    // ✅ YEH PART ADD KARNA HAI (NEW)
    // ================================
    .addCase(fetchPaymentReceivalById.pending, (state) => {
      state.paymentByIdStatus = "loading";
    })
    .addCase(fetchPaymentReceivalById.fulfilled, (state, action) => {
      state.paymentByIdStatus = "succeeded";
      state.paymentReceiveById = action.payload; // ✅ MAIN FIX
    })
    .addCase(fetchPaymentReceivalById.rejected, (state) => {
      state.paymentByIdStatus = "failed";
      state.paymentReceiveById = null;
    })
// _______________2nd May 2026_________________________________    

      // 🔥 UPDATE (YAHI ADD KARNA THA)
  .addCase(updatePaymentReceival.pending, (state) => {
    state.paymentReceiveStatus = "loading";
  })
  .addCase(updatePaymentReceival.fulfilled, (state) => {
    state.paymentReceiveStatus = "succeeded";
  })
  .addCase(updatePaymentReceival.rejected, (state, action) => {
    state.paymentReceiveStatus = "failed";
    state.paymentReceiveError = action.payload;
  })   
  .addCase(fetchAutoloadEnterpriseUnit.fulfilled, (state, action)=>{
    state.autoloadEnterpriseUnit = action?.payload ?? "";
  })
  .addCase(fetchGSTAndStateCodeDetails.fulfilled, (state, action)=>{
    state.gstin = action?.payload?.eu_gstin ?? "";
    state.stateName =  action?.payload?.Statename ?? "";
    state.stateCode = action?.payload?.eu_state_code ?? "";
  })
  .addCase(fetchCustomerName.fulfilled, (state, action)=>{
    state.customerNames = action?.payload ?? []
  })
  .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
      state.customerCode = action?.payload?.advertiser_id ?? "";
      state.customerType = action?.payload?.cust_type ?? "";
      state.customerGstin = action?.payload?.cust_gstin ?? "";
      state.customerAddress = action?.payload?.cust_address ?? "";
  })
  .addCase(fetchProformaInvoiceList.fulfilled, (state, action) => {
      state.performaInvoiceList = action?.payload ?? []
  })
      
  },
});
export const { resetPaymentReceiveById } = paymentSlice.actions;
export default paymentSlice.reducer;
