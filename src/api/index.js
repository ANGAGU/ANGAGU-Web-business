import axios from "axios";
import * as querystring from "querystring";


const hostId = window.location.hostname.split(".")[0];
let server = "https://dev-bapi.angadu.com";

// set server url
if (hostId == "dev") 
    server = "https://dev-bapi.angadu.com";
else if (hostId == "real") 
    server = "https://real-bapi.angagu.com";


// get user token
const setCommonParams = (params) => {
    params.key = localStorage.getItem('key')
}

const api = {
    get: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.get(`${server}${endpoint}`, { params });

        return response.data;
    },

    post: async function (endpoint, params) {
        setCommonParams(params)
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const response = await axios.post(`${server}${endpoint}`, querystring.stringify(params), { headers });

        return response.data;
    },

    put: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.put(`${server}${endpoint}`, params);

        return response.data;
    },

    delete: async function (endpoint, params) {
        setCommonParams(params)
        const response = await axios.delete(`${server}${endpoint}`, { data: params });

        return response.data;
    }

}


export default api;