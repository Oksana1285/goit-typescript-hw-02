import axios from 'axios';

const ACCESS_KEY = 'pH4Y147tmjFwP4sXDQerjWGGe_UAxIW5gtr11UHtvW8';
axios.defaults.baseURL = `https://api.unsplash.com/`;
axios.defaults.headers = {
  Authorization: `Client-ID ${ACCESS_KEY}`,
  'Accept-Version': 'v1',
};

const fetchGalleryImage = async (query, page = 1) => {
  try {
    const response = await axios.get('/search/photos', {
      params: {
        query,
        page,
        per_page: 10,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return null;
  }
};

export default fetchGalleryImage;
