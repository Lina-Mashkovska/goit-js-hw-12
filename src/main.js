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
let captionDelay = '';
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = input.value.trim();
  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Введіть текст для пошуку',
    });
    hideLoader();
    return;
  }
  it (query!== currentQuery) {
    page = 1;
    currentQuery = query;
    clearGallery();
    hideLoadMoreButton();
  }

  showLoader();
 
  try {
  const data = await getImagesByQuery(query,page);
  totalHits = data.totalHits;  
  loadedImages = data.hits.length;
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message: 'Зображення не знайдено',
        });
        hideLoader();
        return;
      }


      createGallery(data.hits);
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
      input.value = '';
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Помилка під час запиту',
      });
    }finally {
      hideLoader();
      input.value = '';
    };
});
btnMore.addEventListener('click', async () => {
    showLoader();
    try {
      const data = await getImagesByQuery(currentQuery, page);
      if (data.hits.length === 0) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'Info',
          message: 'Більше зображень не знайдено',
        });
        return;
      }
      createGallery(data.hits);
      scrollGallery();
      page += 1;
      loadedImages += data.hits.length;
      if (loadedImages >= totalHits){
        hideLoadMoreButton();
        iziToast.info({
            title: 'Info',
            message: "We're sorry, but you've reached the end of search results.",
          });
      }
    } catch (error) {
        iziToast.error({
          title: 'Error',
          message: 'Помилка під час завантаження зображень',
        });
      } finally {
        hideLoader();
      }
    });

