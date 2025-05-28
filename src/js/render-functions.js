import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
let lightbox;
export function renderGallery({
  largeImageURL,
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
      <img
        class="gallery-image"
        src="${webformatURL}"
        alt="${tags}"
      />
    </a>
    <div class="image-info">
      <p><span class="label">Likes</span> <span class="value">${likes}</span></p>
      <p><span class="label">Views</span> <span class="value">${views}</span></p>
      <p><span class="label">Comments</span> <span class="value">${comments}</span></p>
      <p><span class="label">Downloads</span> <span class="value">${downloads}</span></p>
    </div>
  </li>`;
}

export function createGallery(images) {
  const markup = images.map(renderGallery).join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }

  hideLoader();
}

export function scrollGallery() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lastItem = galleryItems[galleryItems.length - 1];

  if (!lastItem) return;

  const { height: cardHeight } = lastItem.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader?.classList.remove('is-hidden');
}

export function hideLoader() {
  loader?.classList.add('is-hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn?.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn?.classList.add('is-hidden');
}
