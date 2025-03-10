import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ modalOpen, modalClose, src, alt }) => {
  return (
    <Modal
      overlayClassName={css.backdrop}
      className={css.modal}
      isOpen={modalOpen}
      onRequestClose={modalClose}
    >
      <button onClick={modalClose} className={css.modalBtn}>
        close
      </button>
      <div>
        <img className={css.modalImg} src={src} alt={alt} />
        <p className={css.modalText}>{alt}</p>
      </div>
    </Modal>
  );
};

export default ImageModal;
