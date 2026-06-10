import httpClient from "@/utils/httpClient";

const membershipServices = {
    getMembershipDetails: async (reqBody) => {
        const response = await httpClient.post("/membership/details/", {...reqBody});
        return response.data;
    },
}

export default membershipServices;