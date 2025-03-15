import css from './ImageCard.module.css';
import { PhotoUrls } from '../../App.types';

type Prop = {
  alt_description: string;
  urls: PhotoUrls;
  updateModalData: (url: string, alt: string) => void;
};

const ImageCard: React.FC<Prop> = ({
  alt_description,
  urls,
  updateModalData,
}) => {
  return (
    <div onClick={() => updateModalData(urls.regular, alt_description)}>
      <img className={css.cardImage} src={urls.regular} alt={alt_description} />
      <p className={css.cardText}>{alt_description}</p>
    </div>
  );
};

export default ImageCard;
