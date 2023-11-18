import axios from 'axios';
import iziToast from 'izitoast';
import {
  showLoader,
  hideLoader,
  showSelect,
  showCatInfo,
  hideCatInfo,
} from './service';
import 'izitoast/dist/css/iziToast.min.css';

const API_KEY =
  'live_P6eHC8x9yyGVa6CysCPhrxwT8EKHp1a9orNVwSceBe3F1s3xTVSIChOaGbnrGJfj';
const BASE_URL = 'https://api.thecatapi.com/v1/';
const BREEDS_PATH = 'breeds';
const CAT_INFO_PATH = 'images/search';

export async function fetchCatBreeds() {
  showLoader();
  try {
    const response = await axios.get(`${BASE_URL}${BREEDS_PATH}`, {
      headers: { 'x-api-key': `${API_KEY}` },
    });
    return response.data;
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `${error.message}`,
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    showSelect();
  }
}

export async function fetchCatById(id) {
  showLoader();
  hideCatInfo();
  try {
    const response = await axios.get(`${BASE_URL}${CAT_INFO_PATH}?`, {
      params: {
        breed_ids: id,
      },
      headers: { 'x-api-key': `${API_KEY}` },
    });
    return response.data;
  } catch (error) {
    iziToast.show({
      title: 'Error',
      message: `${error.message}`,
      color: 'red',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    showCatInfo();
  }
}
