import axios from 'axios'

const url = 'https://api-pim-eu10.erply.com/v1/'

const config = {
  headers: {
    sessionKey: localStorage.getItem('sessionKey'),
    clientCode: '372'
  }
}

export const callGetDataApi = async (endpoint, filters) => {
  try {
    const response = await axios.get(`${url}${endpoint}${filters}`, config);
    return response.data
  } catch (e) {
    console.error(e)
  }
}