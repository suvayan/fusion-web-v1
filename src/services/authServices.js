import httpClient from "@/utils/httpClient";


const authServices = {
    login: async (credentials) => {
        const {userid: username, password} = credentials;
        const response = await httpClient.post("/auth/login/", { username, password });
        return response.data;
    },

    me: async () => {
        const response = await httpClient.get("/auth/me/");
        return response.data;
    },

    logout: async () => {
        const response = await httpClient.post("/auth/logout/");
        return response.data;
    }
};

export default authServices;