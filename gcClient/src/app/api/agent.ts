import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/Pagination";
import { toast } from "react-toastify";
import { setUser } from "../../features/account/accauntSlice";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:34373/api/';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    // const token = store.getState().accaunt.user?.token.accessToken;
    const token = JSON.parse(localStorage.getItem('token')!);
    if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
    }
    return response
}, async (error: AxiosError) => {
    const originalRequest = error.config;
    const { data, status } = error.response as AxiosResponse;
    const token = localStorage.getItem('token');
    // const dispatch = useAppDispatch();
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    modelStateErrors.push(data.errors[key]);
                }
                console.log(modelStateErrors.flat())
                throw modelStateErrors.flat();
            }
           break;
        case 401:
            // console.log('girdi')
            // if (data.errors) {
            //     console.log('noldu')
            //     // throw data.errors;
            // } 
            // else if(originalRequest?.url?.includes('refresh')){
            //     localStorage.removeItem('token');
            //     // store.dispatch(setUser(null));
            // } 
            if (originalRequest?.url?.includes('refresh')){
                localStorage.removeItem('token');
                setUser(null);
            } else if (token && error.response && originalRequest) {
                
                const refreshToken = JSON.parse(token).refreshToken;
                try {
                    const response = await axios.post(`http://localhost:34373/api/Account/refresh?refresh=${refreshToken}`);
                    localStorage.setItem('token', JSON.stringify(response.data))
                    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                    // toast.error('Unaothorized');
                    // console.log(originalRequest)
                    return axios(originalRequest);
                    // throw data;
                } catch (error) {
                    
                    localStorage.removeItem('token');
                    // store.dispatch(setUser(null));
                }
            

            } else {
                localStorage.removeItem('token');
                toast.error('Unaothorized');
            }
            
            break;
        case 500:
            console.log(data)
            router.navigate('/server-error', { state: {error: data} })
            break;
        }
        return Promise.reject(data);
})

const responseBody = (response: AxiosResponse) => response.data;
const request = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: object) => axios.post(url, body).then(responseBody),
    put: (url: string, body: object) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {

    jewelries: (productType: string, params: URLSearchParams) => request.get(`Jewelry/${productType}`, params),
    // rings: () => request.get(`Jewelry/Rings`),
    // braceletes: () => request.get(`Jewelry/Braceletes`),
    // necklakes: () => request.get(`Jewelry/Necklakes`),
    // earrings: () => request.get(`Jewelry/Earrings`),
    filters: () => request.get('Jewelry/filters'),
    details: (id: string) => request.get(`Jewelry/${id}`),
    recomendeds: (id: number, name: string, type: string) => request.get(`Jewelry/recomendeds?id=${id}&name=${name}&type=${type}`)
}

const Basket = {
    get: () => request.get(`Basket`),
    add: (productId: number, size: string = '', qunatity: number = 1) => request.post(`Basket?productId=${productId}&quantity=${qunatity}&size=${size}`, {}),
    delete: (productId: number, size: string = '', qunatity: number = 1) => request.delete(`Basket?productId=${productId}&quantity=${qunatity}&size=${size}`)
}


const Accaunt = {
    login: (values: any) => request.post('Account/login', values),
    fetchUser: () => request.get('Account/'),
    register: (values: any) => request.post('Account/register', values),
    refresh: (refresh: string) => request.post(`Account/refresh?refresh=${refresh}`, {}),
    logout: () => request.post(`Account/logout`, {})
};

const agent = {
    Catalog, Basket, Accaunt
};

export default agent;