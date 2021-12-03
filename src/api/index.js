import axios from 'axios';

const url = 'https://372.erply.com/api/';

const qs = (params) => Object.keys(params)
.map(key => `${key}=${params[key]}`)
.join('&')

export const callApi = async (action, data = {}) => {
  try {
    const response = await axios.post(`${url}${action}/?${qs(data)}`);
    return response;
  } catch (e) {
    if ([401, 403].includes(e.response?.status)) // TODO - redirect login

      return { success: false };
  }
};
