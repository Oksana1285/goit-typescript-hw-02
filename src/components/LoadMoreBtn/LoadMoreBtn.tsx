import css from './LoadMoreBtn.module.css';

type Prop = {
  handleLoadMore: () => void;
  active: boolean;
};

const LoadMoreBtn: React.FC<Prop> = ({ handleLoadMore, active }) => {
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
