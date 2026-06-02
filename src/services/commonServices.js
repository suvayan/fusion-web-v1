import httpClient from "@/utils/httpClient";

const commonServices = {
    getOptions: async () => {
        const response = await httpClient.get("/common/countries");
        return response.data;
    },
    getDepositBanks: async () => {
        const response = await httpClient.get(`/common/deposit-banks`);
        return response.data;
    },
    getDepositBankAc: async (bank_id) => {
        const response = await httpClient.get(`/common/deposit-bank-accounts?bmd_id=${bank_id}`);
        return response.data;
    },
    getConcernDepartments: async () => {
        const response = await httpClient.get(`/common/concern-departments`);
        return response.data;
    },

    getEnterpriseUnitList: async () => {
        const response = await httpClient.get(`common/enterpriseunitlist`);
        return response.data;
    },
    getServiceList: async (query) => {
        const queryParams = new URLSearchParams();
        Object.entries(query || {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                queryParams.append(key, value);
            }
        });
        const response = await httpClient.get(`/common/servicelist?${queryParams}`);
        return response.data;
    },
    getStateNames: async (prefixText) => {
        const response = await httpClient.get(`/common/getstatename?prefixText=${prefixText}`);
        return response.data;
    },
    getNationality: async () => {
        const response = await httpClient.get(`/common/nationality`);
        return response.data;
    },
    getAllState: async () => {
        const response = await httpClient.get(`/common/all-state`);
        return response.data;
    },
    getDispatchModes: async () => {
        const response = await httpClient.get(`/common/dispatch-modes`);
        return response.data;
    },
    getPostalCodes: async () => {
        const response = await httpClient.get(`/common/postal-codes`);
        return response.data;
    },
    getRegions: async () => {
        const response = await httpClient.get(`/common/regions`);
        return response.data;
    },
    getChapters: async (region_id) => {
        const response = await httpClient.get(`/common/chapters?region_id=${region_id}`);
        return response.data;
    },
    getMembershipClass: async () => {
        const response = await httpClient.get(`/common/membership-classes`);
        return response.data;
    },
};

export default commonServices;