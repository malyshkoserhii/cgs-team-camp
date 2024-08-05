import axios from 'axios';
import { APP_KEYS } from '~shared/consts';
import { SERVER_URL } from '~shared/consts/app-keys.const';
const instance = axios.create({
    withCredentials:true,
    baseURL:SERVER_URL,
})
// instance.interceptors.request.use((config)=>{
//     config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;
//     console.log(config)
//     return config;
// });

// instance.interceptors.response.use((config) => {
//     return config;
// },async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true;
//         try {
//             const response = await axios.get(`http://localhost:3030/api/user/refresh`, {withCredentials: true})
//             console.log(response.data.accessToken)
//             localStorage.setItem('token', response.data.accessToken);
//             return instance.request(originalRequest);
//         } catch (e) {
//             console.log('Not authorized')
//         }
//     }
//     throw error;
// })
export default instance;