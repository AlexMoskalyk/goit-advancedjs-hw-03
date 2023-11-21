import { fetchCatBreeds, fetchCatById } from './cat-api';
import { updateContent } from './service';
import {
  showLoader,
  hideLoader,
  showSelect,
  showCatInfo,
  hideCatInfo,
} from './service';
import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  loader: document.querySelector('.loader'),
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

function getCatBreeds() {
  showLoader();
  try {
    fetchCatBreeds().then(data => {
      elements.breedSelect.insertAdjacentHTML('beforeend', addOptins(data));
    });
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

getCatBreeds();

elements.breedSelect.addEventListener('change', handleSelect);

async function handleSelect(evt) {
  elements.catInfo.innerHTML = '';
  showLoader();
  hideCatInfo();
  try {
    const data = await fetchCatById(evt.target.value);
    if (data.length === 0) {
      updateContent(
        elements.catInfo,
        '<h1>Opps something wrong, try again!</h1>'
      );
      return;
    }
    updateContent(elements.catInfo, createMarkUpCatInfo(data));
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

function addOptins(arr) {
  return arr
    .map(item => {
      return `<option value="${item.id}">${item.name}</option>`;
    })
    .join('');
}

function createMarkUpCatInfo(arr) {
  return arr
    .map(
      item => `
    <img src="${item.url}" alt="${item.breeds[0].name}" width="300" />
    <h2>${item.breeds[0].name}</h2>
    <p>${item.breeds[0].description}</p>
    <h3>Temperament:<span>${item.breeds[0].temperament}</span></h3>    
  `
    )
    .join('');
}
