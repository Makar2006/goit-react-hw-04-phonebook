import css from './Filter.module.css';

export const Filter = ({ filter, whenFilterChange }) => {
  return (
    <input
      type="text"
      placeholder="Search contacts"
      value={filter}
      onChange={whenFilterChange}
      className={css.filterInput}
    />
  );
};
