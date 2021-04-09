import axios from 'axios';
import * as querystring from 'querystring';

axios.defaults.baseURL = 'https://angagu.github.io/ANGAGU_WEB_business/';
axios.defaults.withCredentials = true;

const hostId = window.location.hostname.split('.')[0];
let server = 'https://dev-bapi.angadu.com';

// set server url
if (hostId === 'dev') server = 'https://dev-bapi.angadu.com';
else if (hostId === 'real') server = 'https://real-bapi.angagu.com';

// get user token
const setCommonParams = (params:any) => {
  params.key = localStorage.getItem('key');
};

const api = {
  setAxiosDefaultHeader(accessToken: any) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },

  async get(endpoint:string, params:any) {
    setCommonParams(params);
    const response = await axios.get(`${server}${endpoint}`, { params });

    return response.data;
  },

  async post(endpoint:string, params:any) {
    setCommonParams(params);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(
      `${server}${endpoint}`,
      querystring.stringify(params),
      { headers },
    );

    return response.data;
  },

  async put(endpoint:string, params:any) {
    setCommonParams(params);
    const response = await axios.put(`${server}${endpoint}`, params);

    return response.data;
  },

  async delete(endpoint:string, params:any) {
    setCommonParams(params);
    const response = await axios.delete(`${server}${endpoint}`, {
      data: params,
    });

    return response.data;
  },
};

export default api;
