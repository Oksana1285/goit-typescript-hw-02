import css from './ErrorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={css.errorContainer}>
      <p className={css.errorText}>
        Whoops, something went wrong! <br />
        Please try reloading this page!
      </p>
    </div>
  );
};

export default ErrorMessage;
