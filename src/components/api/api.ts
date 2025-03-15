import axios from 'axios';
import { FetchGalleryPhotoResponse } from '../../App.types';

const ACCESS_KEY: string = 'pH4Y147tmjFwP4sXDQerjWGGe_UAxIW5gtr11UHtvW8';
axios.defaults.baseURL = `https://api.unsplash.com/`;
axios.defaults.headers.common['Authorization'] = `Client-ID ${ACCESS_KEY}`;
axios.defaults.headers.common['Accept-Version'] = 'v1';

const fetchGalleryImage = async (
  query: string,
  page: number
): Promise<FetchGalleryPhotoResponse> => {
  const response = await axios.get('/search/photos', {
    params: {
      query,
      page,
      per_page: 10,
    },
  });
  return response.data;
};

export default fetchGalleryImage;
