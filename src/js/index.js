import axios from 'axios';
import { fetchCatBreeds, fetchCatById } from './cat-api';
import { updateContent } from './service';

const elements = {
  loader: document.querySelector('.loader'),
  breedSelect: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

fetchCatBreeds().then(data => {
  elements.breedSelect.insertAdjacentHTML('beforeend', addOptins(data));
});

elements.breedSelect.addEventListener('change', handleSelect);

async function handleSelect(evt) {
  elements.catInfo.innerHTML = '';
  try {
    const data = await fetchCatById(evt.target.value);
    updateContent(elements.catInfo, createMarkUpCatInfo(data));
  } catch (error) {
    updateContent(elements.catInfo, '<h1>Opps something wrong</h1>');
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

// adaptability: 5;
// affection_level: 4;
// alt_names: '';
// child_friendly: 4;
// country_code: 'GR';
// country_codes: 'GR';
// description: 'Native to the Greek islands known as the Cyclades in the Aegean Sea, these are natural cats, meaning they developed without humans getting involved in their breeding. As a breed, Aegean Cats are rare, although they are numerous on their home islands. They are generally friendly toward people and can be excellent cats for families with children.';
// dog_friendly: 4;
// energy_level: 3;
// experimental: 0;
// grooming: 3;
// hairless: 0;
// health_issues: 1;
// hypoallergenic: 0;
// id: 'aege';
// indoor: 0;
// intelligence: 3;
// life_span: '9 - 12';
// name: 'Aegean';
// natural: 0;
// origin: 'Greece';
// rare: 0;
// reference_image_id: 'ozEvzdVM-';
// rex: 0;
// shedding_level: 3;
// short_legs: 0;
// social_needs: 4;
// stranger_friendly: 4;
// suppressed_tail: 0;
// temperament: 'Affectionate, Social, Intelligent, Playful, Active';
// vetstreet_url: 'http://www.vetstreet.com/cats/aegean-cat';
// vocalisation: 3;
