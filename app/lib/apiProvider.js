
import axios from 'axios';

import storage from './storage.js';

async function isAuthenticated() {  
  return await storage.hasAuthToken();
}

async function logout() {
  return await storage.deleteAuthToken();
}

async function login(username, password) {  

  try {
    const response = await axios({
      url: 'https://api.github.com/authorizations',
      method: 'post',
      auth: { username, password },
      data: {
        note: `react-native-github-client`
      }
    });

    token = response && response.data && response.data.token;

    if (token) {
      await storage.setAuthToken(token);
    }

  } catch (error) {

  }

  return await isAuthenticated();
}

async function getUser() {

  const token = await storage.getAuthToken();

  const response = await axios({
    url: 'https://api.github.com/user',
    headers: {
      'Authorization': `token ${token}`
    }
  });

  return response.data;
}

export default {
  isAuthenticated,
  login,
  logout,
  getUser
};
