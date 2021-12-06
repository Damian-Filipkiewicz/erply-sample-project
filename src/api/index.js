import axios from 'axios';

const auth_url = 'https://372.erply.com/api';
const url = 'https://api-pim-eu10.erply.com/v1/';

const qs = (params) => Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

const config = {
  headers: {
    sessionKey: localStorage.getItem('sessionKey'),
    clientCode: '372',
  },
};

export const verifyUser = async (action, data = {}) => {
  try {
    const response = await axios.post(`${auth_url}${data && ('/?' + qs(data))}`);
    localStorage.setItem('sessionKey', response.data.records[0].sessionKey);
    localStorage.setItem('username', response.data.records[0].employeeName);
    config.headers.sessionKey = response.data.records[0].sessionKey;
    return response;
  } catch (e) {
    if (e.message === 'Network error') {
      return { success: false, status: 410 }
    }
    if ([401, 403].includes(e.response?.status)) {
      window.location.href = '/login';
    }
    return { success: false, status: 401 };
  }
};


export const callGetDataApi = async (endpoint, filters = '') => {
  try {
    const response = await axios.get(`${url}${endpoint}${filters}`, config);
    return response.data;
  } catch (e) {
    if (e.response.data.message === 'session key is expired') {
      window.location.href = '/login';
    }
    console.error(e);
  }
};
