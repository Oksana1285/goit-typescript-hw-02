import { Formik, Form, Field } from 'formik';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';

interface FormValues {
  query: string;
}

interface Prop {
  onSubmit: (query: string) => void;
}

const initialValues: FormValues = { query: '' };

const SearchBar: React.FC<Prop> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        if (!values.query.trim()) {
          toast.error('Please enter the value in the search field');
          return;
        }
        onSubmit(values.query);
        actions.resetForm();
      }}
    >
      <Form className={css.searchForm}>
        <Field
          className={css.searchInput}
          name="query"
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchBar;
