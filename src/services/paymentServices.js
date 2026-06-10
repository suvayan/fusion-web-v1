import httpClient from "../utils/httpClient";

const paymentServices = {

    paymentReceival: async (paymentData) => {
        const response = await httpClient.post(
            "/account-management/payment-receival",
            { paymentData }
        );
        return response.data;
    },

    paymentReceivalDetails: async () => {
        const response = await httpClient.get(
            `/account-management/payment-receival-view/`
        );
        return response.data;
    },

    // ================================
    // ✅ NEW API (GET BY RECEIPT NO)
    // ================================
    getPaymentReceivalById: async (receiptNo) => {
        const response = await httpClient.get(
            `/account-management/payment-receival/${receiptNo}`   // ✅ check route once
        );
        return response.data;
    },
// ---------------------2nd May 2026------------------------------
     // ✅ 👉 YAHI ADD KARNA THA
    updatePaymentReceival: async (receiptNo, data) => {
        const response = await httpClient.put(
            `/account-management/payment-receival/${receiptNo}`,
            data
        );
        return response.data;
    },
// --------------------end------------------------------

    getAutoloadEnterpriseUnit:  async () => {
        const response = await httpClient.get(`/account-management/autoloadenterpriseunit`);
        return response.data;
    },
    getGSTAndStateCodeDetails:  async (enterprise_id) => {
        const response = await httpClient.get(`account-management/getgstandstatecodedetails?enterprise_id=${enterprise_id}`);
        return response.data;
    },
    getCustomerName: async (customer) => {
        const response = await httpClient.get(`/account-management/fetch-customer-name?prefixText=${customer}`);
        return response.data;
    },
    getCustomerDetails: async (customer_name) => {
        const response = await httpClient.get(`/account-management/display-customer-details?customer_name=${customer_name}`);
        return response.data;
    },
    getProformaInvoiceList: async () => {
        const response = await httpClient.get(`/account-management/getProformaInvoicelist`);
        return response.data;
    },
    getReceiptPayeeDetails: async (receiptNo) => {
        const response = await httpClient.get(`/account-management/receipt-payee-details?receiptNo=${receiptNo}`);
        return response.data;
    },
    getMemberCategories: async () => {
        const response = await httpClient.get(`/account-management/member-category-options2`);
        return response.data;
    },
    createProformaInvoice: async (reqBody) => {
        const response = await httpClient.post(`/account-management/autoloadsubmitcreateproformainvoice`, {...reqBody});
        return response.data;
    },
    createNewMember: async (reqBody) => {
        const response = await httpClient.post(`/account-management/create-new-membership`, {...reqBody});
        return response.data;
    }

};

export default paymentServices;