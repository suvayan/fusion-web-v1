import httpClient from "@/utils/httpClient";


const userServices = {
    getUserDetails: async () => {
        const response = await httpClient.get("/user/details/");
        return response.data;
    }
};

export default userServices;