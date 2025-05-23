import authorizedAxiosInstance from "~/utils/authorizeAxios.js";
import {API_ROOT} from "~/utils/constants.js";


export const refreshTokenAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
    return response.data
}
