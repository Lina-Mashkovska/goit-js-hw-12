import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollGallery,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = document.querySelector('input[name="search-text"]');
const btnMore = document.querySelector('.load-more');

let page = 1;
let totalHits = 0;
let loadedImages = 0;
let currentQuery = '';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Введіть текст для пошуку',
    });
    return;
  }

  if (query !== currentQuery) {
    currentQuery = query;
    page = 1;
    totalHits = 0;
    loadedImages = 0;
    clearGallery();
    hideLoadMoreButton();
  }

  await fetchAndRenderImages();
});

btnMore.addEventListener('click', async () => {
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    const hits = data.hits;
    if (hits.length === 0 && page === 1) {
      iziToast.info({
        title: 'Info',
        message: 'Зображення не знайдено',
      });
      hideLoadMoreButton();
      return;
    }

    createGallery(hits);
    loadedImages += hits.length;
    totalHits = data.totalHits;
    page += 1;

    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton();
    }

    if (page > 2) {
      scrollGallery();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Помилка під час завантаження зображень',
    });
  } finally {
    hideLoader();
    if (page === 2) {
      input.value = '';
    }
  }
}


