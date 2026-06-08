import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import membershipServices from "@/services/membershipServices";
import {parseDDMMYYYY} from "@/utils/utils";
import { showToast } from "../components/toastify/Toastify";


export const getMembershipDetails = createAsyncThunk(
  "membership/getMembershipDetails",
  async (reqBody, { rejectWithValue }) => {
    try {
      const response = await membershipServices.getMembershipDetails(reqBody);
      return response.data; // ✅ IMPORTANT FIX
    } catch (error) {
      showToast.error(error.message);
      return rejectWithValue(error);
    }
  }
);



const initialState = {
    membershipDetails: null
}


const membershipSlice = createSlice({
    name: "membership",
    initialState,
    reducers: {
        resetMembershipDetails : (state) => {
            state.membershipDetails =  null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMembershipDetails.fulfilled, (state, action) => {
                const {payload} = action;
                const nationality = payload?.imm_country && payload.imm_country === "India" ? "Indian" : "Others"
                state.membershipDetails = {
                    ...state.membershipDetails,
                    membershipId: payload?.imm_id ?? "",
                    membershipNo: payload?.imm_no ?? "",
                    firstName: payload?.imm_name ?? "",
                    middleName: payload?.imm_m_name ?? "",
                    lastName: payload?.imm_l_name ?? "",
                    dateOfBirth: payload?.imm_dob ? parseDDMMYYYY(payload.imm_dob) : "",
                    region: payload?.imm_region ?? "",
                    chapter: payload?.imm_chapter ?? "",
                    address: payload?.imm_mailing_address ?? "",
                    nationality: payload?.imm_country ? nationality : "",
                    country: payload?.imm_country ?? "",
                    state: payload?.imm_state ?? "",
                    email: payload?.imm_email_id ?? "",
                    mobileNoUnq: payload?.imm_mobile_no ?? "",
                    mobileNo: payload?.imm_mobile ?? "",
                    pincode: payload?.imm_pin_code ?? "",
                    postalCode: payload?.imm_postal_code ?? "",
                    addressType: payload?.imm_address_type ?? "",
                    telephon: payload?.imm_telephone_no ?? "",
                    website: payload?.company_website ?? "",
                    panGstn: payload?.imm_pan_no ?? "",
                    dispatchMode: payload?.imm_despath_mode ?? "",
                    updatedOn: payload?.imm_upd_dt ? parseDDMMYYYY(payload.imm_upd_dt) : "",
                    updatedBy: payload?.imm_upd_by ?? ""
                }
            })
    }
})

export const { resetMembershipDetails } = membershipSlice.actions;
export default membershipSlice.reducer;