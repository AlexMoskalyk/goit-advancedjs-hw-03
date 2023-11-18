const elements = {
  loader: document.querySelector('.loader'),
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
};

export function showLoader() {
  elements.loader.classList.remove('hidden');
}

export function hideLoader() {
  elements.loader.classList.add('hidden');
}

export function showSelect() {
  elements.select.classList.remove('hidden');
}

export function hideSelect() {
  elements.select.classList.add('hidden');
}

export function showCatInfo() {
  elements.catInfo.classList.remove('hidden');
}

export function hideCatInfo() {
  elements.catInfo.classList.add('hidden');
}

export function updateContent(element, newContent) {
  element.innerHTML = newContent;
}
