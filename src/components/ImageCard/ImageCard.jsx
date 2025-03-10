import css from './ImageCard.module.css';

const ImageCard = ({ alt_description, urls, upgradeModalData }) => {
  return (
    <div onClick={() => upgradeModalData(urls.regular, alt_description)}>
      <img className={css.cardImage} src={urls.regular} alt={alt_description} />
      <p className={css.cardText}>{alt_description}</p>
    </div>
  );
};

export default ImageCard;
