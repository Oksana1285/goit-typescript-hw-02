import { useState, useEffect, useMemo, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import fetchGalleryImage from './components/api/api';
import { Photo, FetchGalleryPhotoResponse } from './App.types';

import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [gallery, setGallery] = useState<Photo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const referation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) return;

    const handleSearch = async () => {
      try {
        setLoading(true);
        setError(false);
        const data: FetchGalleryPhotoResponse = await fetchGalleryImage(
          query,
          page
        );
        if (data.total === 0) return;
        setGallery(prevGallery => {
          return [...prevGallery, ...data.results];
        });
        setTotalPage(data.total_page);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    handleSearch();
  }, [page, query]);

  useEffect(() => {
    if (page === 1) return;

    if (referation.current) {
      referation.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [page, gallery]);

  const handleQuery = (newQuery: string) => {
    setQuery(newQuery);
    setGallery([]);
    setPage(1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateModalData = (scr: string, alt: string) => {
    setModalImage(scr);
    setDescription(alt);
  };

  const active = useMemo(() => page === totalPage, [page, totalPage]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalData={updateModalData}
        />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {gallery.length > 0 && !loading && !error && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} active={active} />
      )}
      <ImageModal
        modalOpen={modalOpen}
        modalClose={closeModal}
        src={modalImage}
        alt={description}
      />
      <div ref={referation}></div>
      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          className: css.toastTextCenter,
        }}
      />
    </div>
  );
};

export default App;
