/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import * as querystring from 'querystring';

axios.defaults.baseURL = 'https://angagu.github.io/ANGAGU_WEB_business/';

const server = 'http://54.180.62.210:3000';

// get user token
const setCommonParams = (params: any) => {
  // const key = localStorage.getItem('key');
  // if (params) {
  //   params.key = key;
  // } else {
  //   params = { key };
  // }
  return params;
};

const api = {
  setHeaderVerification(token: string) {
    axios.defaults.headers.common.Verification = token;
  },
  setAxiosDefaultHeader(accessToken: any) {
    axios.defaults.headers.common.Authorization = accessToken;
  },

  async get(endpoint: string, param: any) {
    const params = setCommonParams(param);
    try {
      const response = await axios.get(`${server}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },

  async post(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await axios.post(`${server}${endpoint}`, querystring.stringify(params), { headers });
      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return error;
    }
  },
  async upload(endpoint: string, param: any) {
    const params = setCommonParams(param);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    const formData = new FormData();
    Object.keys(params).map(key => {
      if (Array.isArray(params[key])) {
        params[key].map((item: any) => {
          formData.append(key, item);
          return '';
        });
      } else formData.append(key, params[key]);
      return '';
    });
    try {
      const response = await axios.post(`${server}${endpoint}`, formData, {
        headers,
      });
      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },

  async put(endpoint: string, param: any) {
    const params = setCommonParams(param);
    try {
      const response = await axios.put(`${server}${endpoint}`, params);

      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },

  async delete(endpoint: string, param: any) {
    const params = setCommonParams(param);
    try {
      const response = await axios.delete(`${server}${endpoint}`, {
        data: params,
      });

      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },
};

export default api;
