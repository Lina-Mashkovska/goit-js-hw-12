import axios from 'axios';
const API_KEY = '50264582-5072b5ac7075dcbe954d58fd2';
export async function getImagesByQuery(query, page) {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 15,
      },
    });
  
    return response.data;
  }