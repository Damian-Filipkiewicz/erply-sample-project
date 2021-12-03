import axios from 'axios';

const auth_url = 'https://372.erply.com/api';
const url = 'https://api-pim-eu10.erply.com/v1/';

const qs = (params) => Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

export const verifyUser = async (action, data = {}) => {
  try {
    const response = await axios.post(`${auth_url}${data && ('/?' + qs(data))}`);
    localStorage.setItem('sessionKey', response.data.records[0].sessionKey);
    localStorage.setItem('username', response.data.records[0].employeeName);
    return response;
  } catch (e) {
    if ([401, 403].includes(e.response?.status)) // TODO - redirect login

      return { success: false };
  }
};


const config = {
  headers: {
    sessionKey: localStorage.getItem('sessionKey'),
    clientCode: '372',
  },
};

export const callGetDataApi = async (endpoint) => {
  try {
    const response = await axios.get(`${url}${endpoint}`, config);
    return response.data;
  } catch (e) {
    if (e.response.message === 'session key is expired') {
      // TODO - navigate login
    }
    console.error(e);
  }
};
