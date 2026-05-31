import type { FormEvent } from 'react';
import { useState } from 'react';
import { MapPin, Navigation } from 'react-feather';
import styles from './styles.module.css';

interface ISearchBar {
  onSearch(search: string): void;
  onLocate(): void;
  isLocating: boolean;
}

const SearchBar = ({ onSearch, onLocate, isLocating }: ISearchBar) => {
  const [search, setSearch] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const searchCity = (e: FormEvent): void => {
    e.preventDefault();
    if (!search) return;
    onSearch(search);
  };

  return (
    <form className={styles.form} onSubmit={searchCity}>
      <div className={styles.inputWrapper}>
        <MapPin className={styles.icon} size={20} />
        <input
          onChange={onChange}
          value={search}
          id="search"
          placeholder="Search City"
          className={styles.input}
          autoComplete="off"
        />
      </div>
      <button type="submit" className={styles.button}>
        Search
      </button>
      <button
        type="button"
        className={`${styles.locationButton} ${isLocating ? styles.locationButtonLocating : ''}`}
        onClick={onLocate}
        disabled={isLocating}
        aria-label="Use my location"
        title="Use my location"
      >
        <Navigation size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
