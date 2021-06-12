/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import * as querystring from 'querystring';

axios.defaults.baseURL = 'http://localhost:3000/';

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
  setAxiosDefaultHeader() {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common.Authorization = `${token}`;
  },
  getBaseURL() {
    return axios.defaults.baseURL;
  },
  async get(endpoint: string, param: any) {
    api.setAxiosDefaultHeader();
    const params = param;
    try {
      const response = await axios.get(`${server}${endpoint}`, { params });
      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },

  async post(endpoint: string, param: any) {
    api.setAxiosDefaultHeader();
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
  async upload(endpoint: string, param: any, isPut = false) {
    api.setAxiosDefaultHeader();
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
      let response;
      if (isPut)
        response = await axios.put(`${server}${endpoint}`, formData, {
          headers,
        });
      else
        response = await axios.post(`${server}${endpoint}`, formData, {
          headers,
        });
      return response.data;
    } catch (error) {
      alert(`ERROR: ${error.response.data.message}`);
      return false;
    }
  },

  async put(endpoint: string, param: any) {
    api.setAxiosDefaultHeader();
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
    api.setAxiosDefaultHeader();
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
