import { useState, useEffect, useMemo, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import fetchGalleryImage from './components/api/api';

import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [description, setDescription] = useState('');

  const referation = useRef(null);

  useEffect(() => {
    if (!query) return;

    const handleSearch = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchGalleryImage(query, page);
        // console.log('data:', data);
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

  const handleQuery = newQuery => {
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

  const upgradeModalData = (scr, alt) => {
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
          upgradeModalData={upgradeModalData}
        />
      )}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {gallery.length > 0 && !loading && !error && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={active} />
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
