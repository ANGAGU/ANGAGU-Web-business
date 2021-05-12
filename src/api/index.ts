/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import * as querystring from 'querystring';

// axios.defaults.baseURL = 'https://angagu.github.io/ANGAGU_WEB_business/';
// axios.defaults.withCredentials = true;

const hostId = window.location.hostname.split('.')[0];
let server = 'http://54.180.62.210:3000';

// set server url
if (hostId === 'dev') server = 'https://dev-bapi.angadu.com';
else if (hostId === 'real') server = 'https://real-bapi.angagu.com';

// get user token
const setCommonParams = (params: any) => {
  const key = localStorage.getItem('key');
  if (params) {
    params.key = key;
  } else {
    params = { key };
  }
  return params;
};

const api = {
  setAxiosDefaultHeader(accessToken: any) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },

  async get(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const response = await axios.get(`${server}${endpoint}`, { params });

    return response.data;
  },

  async post(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(`${server}${endpoint}`, querystring.stringify(params), { headers });

    return response.data;
  },
  async upload(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    Object.keys(params).map(key => {
      formData.append(key, params[key]);
      return '';
    });
    const response = await axios.post(`${server}${endpoint}`, formData, {
      headers,
    });
    return response.data;
  },

  async put(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const response = await axios.put(`${server}${endpoint}`, params);

    return response.data;
  },

  async delete(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const response = await axios.delete(`${server}${endpoint}`, {
      data: params,
    });

    return response.data;
  },
};

export default api;
