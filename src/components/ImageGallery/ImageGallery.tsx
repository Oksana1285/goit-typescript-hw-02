import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Photo } from '../../App.types';

type Prop = {
  gallery: Photo[];
  openModal: () => void;
  updateModalData: (url: string, alt: string) => void;
};

const ImageGallery: React.FC<Prop> = ({
  gallery,
  openModal,
  updateModalData,
}) => {
  return (
    <ul className={css.galleryContainer}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li className={css.galleryCard} key={id} onClick={openModal}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            updateModalData={updateModalData}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
