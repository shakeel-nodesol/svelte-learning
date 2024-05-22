import axios from "axios";
import * as set_cookie_parser from "set-cookie-parser";

const axiosInstance = axios.create({
    baseURL: "https://emp-api.codinglab.live",
    withCredentials: true
});


const useApi = async (data) => {
    if (data.hasOwnProperty('cookies') && !data.cookies.get('csrfToken')) {
        const sanctumResponse = await axiosInstance.get('/sanctum/csrf-cookie');

        for (const str of set_cookie_parser.splitCookiesString(sanctumResponse?.headers?.get('set-cookie'))) {
            const cookie = set_cookie_parser.parseString(str);
            data.cookies.set(cookie.name === "XSRF-TOKEN" ? 'csrfToken' : cookie.name, cookie.value, {...cookie, secure: true});
        }
    }

    return await axiosInstance.request({
        url: data.url,
        method: data.method,
        data: data.data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': data.cookies.get('token') ? `Bearer ${atob(data.cookies.get('token'))}` : null,
            'XSRF-TOKEN': data.cookies.get('csrfToken') ? `${data.cookies.get('csrfToken')}` : null,
            ...data.headers
        },
        params: data.method?.toLowerCase() === 'get' ? data.data : {}
    })
        .then(res => Promise.resolve(res.data))
        .catch(error => {
            return Promise.reject(error)
        })

}

export default useApi
