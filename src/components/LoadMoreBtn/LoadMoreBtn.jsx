import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ handleLoadMore, active }) => {
  return (
    <div className={css.loadMore}>
      <button
        className={css.loadBtn}
        onClick={handleLoadMore}
        type="button"
        disabled={active}
      >
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
