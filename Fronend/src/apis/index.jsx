import authorizedAxiosInstance from "~/utils/authorizeAxios.js";
import {API_ROOT} from "~/utils/constants.js";
import {toast} from "react-toastify";


export const refreshTokenAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
    return response.data
}

// User API

export const registerUserAPI = async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
    toast.success('Account created successfully! Please check and verify your account before logging in!', {theme: 'colored'})
    return response.data
}

export const verifyUserAPI = async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
    toast.success('Account verified successfully! Now you can login to enjoy our services!')
    return response.data
}
