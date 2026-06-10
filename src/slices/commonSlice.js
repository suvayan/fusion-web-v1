import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import commonServices from "../services/commonServices";
import {showToast} from "../components/toastify/Toastify";


export const fetchCountries = createAsyncThunk(
    "common/fetchCountries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getOptions();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
);

export const fetchDepositBanks = createAsyncThunk(
    "common/fetchDepositBanks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getDepositBanks();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
);


export const fetchDepositBankAccounts = createAsyncThunk(
    "common/fetchDepositBankAccounts",
    async (bank_id, { rejectWithValue }) => {
        try {            
            const response = await commonServices.getDepositBankAc(bank_id);
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const fetchConcernDepartments = createAsyncThunk(
    "common/fetchConcernDepartments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getConcernDepartments();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
);

export const fetchEnterpriseUnitList = createAsyncThunk(
    "common/fetchEnterpriseUnitList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getEnterpriseUnitList();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const fetchServiceList = createAsyncThunk(
    "common/fetchServiceList",
    async (query, { rejectWithValue }) => {
        try {
            const response = await commonServices.getServiceList(query);
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const fetchStateNames = createAsyncThunk(
    "common/fetchStateNames",
    async (query, { rejectWithValue }) => {
        try {
            const response = await commonServices.getStateNames(query);
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const fetchStateCode = createAsyncThunk(
    "common/fetchStateCode",
    async (query, { rejectWithValue }) => {
        try {
            const response = await commonServices.getStateNames(query);
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const getNationality = createAsyncThunk(
    "common/getNationality",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getNationality();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
) 


export const getAllState = createAsyncThunk(
    "common/getAllState",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getAllState();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const getDispatchModes = createAsyncThunk(
    "common/getDispatchMode",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getDispatchModes();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const getPostalCodes = createAsyncThunk(
    "common/getPostalCodes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getPostalCodes();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)

export const getRegions = createAsyncThunk(
    "common/getRegions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getRegions();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)


export const getChapters = createAsyncThunk(
    "common/getChapters",
    async (region_id, { rejectWithValue }) => {
        try {
            const response = await commonServices.getChapters(region_id);
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)


export const getMembershipClass = createAsyncThunk(
    "common/getMembershipClass",
    async (_, { rejectWithValue }) => {
        try {
            const response = await commonServices.getMembershipClass();
            return response;
        } catch (error) {
            showToast.error(error.message);
            return rejectWithValue(error);
        }
    }
)


// initial state for common slice
const initialState = {
    countries: [],
    states: [],
    allStates: [],
    stateByCountry: [],
    depositBanks: [],
    depositBankAccounts: [],
    concernDepartments: [],
    enterpriseUnitList: [],
    serviceList: [],
    stateCode: "",
    nationalities: [],
    dispatchModes: [],
    postalCods: [],
    regions: [],
    chapters: [],
    memberShipClasses: []
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setStateByCounrty: (state, action) => {
            state.stateByCountry = action.payload ?? []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload?.data ?? [];
            })
            .addCase(fetchDepositBanks.fulfilled, (state, action) => {
                state.depositBanks = action.payload?.data ?? [];
            })
            .addCase(fetchDepositBankAccounts.fulfilled, (state, action) => {
                state.depositBankAccounts = action.payload?.data ?? [];
            })
            .addCase(fetchConcernDepartments.fulfilled, (state, action) => {
                state.concernDepartments = action.payload?.data ?? [];
            })
            .addCase(fetchEnterpriseUnitList.fulfilled, (state, action) => {
                state.enterpriseUnitList = action.payload?.data ?? [];
            })
            .addCase(fetchServiceList.fulfilled, (state, action)=>{
                state.serviceList = action?.payload?.data ?? []
            })
            .addCase(fetchStateNames.fulfilled, (state, action)=>{
                state.states = action?.payload?.data
            })
            .addCase(fetchStateCode.fulfilled, (state, action)=>{
                state.stateCode = action?.payload?.data[0].state_code
            })
            .addCase(getNationality.fulfilled, (state, action)=>{
                state.nationalities = action?.payload?.data
            })
            .addCase(getAllState.fulfilled, (state, action)=>{
                state.allStates = action?.payload?.data
            })
            .addCase(getDispatchModes.fulfilled, (state, action)=>{
                state.dispatchModes = action?.payload?.data
            })
            .addCase(getPostalCodes.fulfilled, (state, action)=>{
                state.postalCods = action?.payload?.data
            })
            .addCase(getRegions.fulfilled, (state, action)=>{
                state.regions = action?.payload?.data
            })
            .addCase(getChapters.fulfilled, (state, action)=>{
                state.chapters = action?.payload?.data
            })
            .addCase(getMembershipClass.fulfilled, (state, action)=>{
                state.memberShipClasses = action?.payload?.data
            })
    }
});

export const { setStateByCounrty } = commonSlice.actions;
export default commonSlice.reducer;