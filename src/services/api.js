import axios from 'axios';
import { Auth } from 'aws-amplify';
import envConfig from '../envConfig';

const baseUrl = envConfig.apiUrl;

async function createMedia(media) {
  try {
    const { data } = await axios.post(`${baseUrl}/media`, media);
    return data;
  } catch (error) {
    return { error: `Create Media Failed: ${error}` };
  }
}

async function getOneMedia(username, mediaId) {
  try {
    const { data } = await axios.get(`${baseUrl}/media/${mediaId}`, { username });
    return data;
  } catch (error) {
    return { error: `Get One Media Failed: ${error}` };
  }
}

async function getUserMedia() {
  try {
    const { username } = await Auth.currentAuthenticatedUser();
    const { data } = await axios.get(`${baseUrl}/media?username=${username}`);
    return data;
  } catch (error) {
    return { error: `Get User Media Failed: ${error}` };
  }
}

async function getAllMedia() {
  try {
    const { data } = await axios.get(`${baseUrl}/media`);
    return data;
  } catch (error) {
    return { error: `Get Media Failed: ${error}` };
  }
}

// async function updateMedia(payload) {

// };

async function deleteMedia(username, mediaId) {
  try {
    const { data } = await axios.delete(`${baseUrl}/media/${mediaId}`, { username });
    return data;
  } catch (error) {
    return { error: `Delete Media Failed: ${error}` };
  }
}

export default {
  createMedia,
  getOneMedia,
  getAllMedia,
  getUserMedia,
  // updateMedia,
  deleteMedia,
};
