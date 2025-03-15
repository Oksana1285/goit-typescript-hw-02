export interface PhotoUrls {
  regular: string;
  small: string;
}

export interface Photo {
  id: string;
  alt_description: string;
  urls: PhotoUrls;
}

export interface FetchGalleryPhotoResponse {
  total: number;
  total_page: number;
  results: Photo[];
}
