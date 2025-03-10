import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ gallery, openModal, upgradeModalData }) => {
  return (
    <ul className={css.galleryContainer}>
      {gallery.map(({ id, alt_description, urls }) => (
        <li className={css.galleryCard} key={id} onClick={openModal}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            upgradeModalData={upgradeModalData}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
