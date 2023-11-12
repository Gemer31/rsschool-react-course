import './Search.scss';
import { FormEvent, useEffect, useState } from 'react';

export interface ISearchProps {
  updateItemsCallback?: (newSearchValue: string) => void;
  searchValue?: string;
}

export function Search({ updateItemsCallback, searchValue }: ISearchProps) {
  const [search, setSearch] = useState<string>('');

  useEffect(() => setSearch(searchValue), [searchValue]);

  return (
    <form className="search__form">
      <input
        type="text"
        className="search__form__input"
        onInput={(event: FormEvent) =>
          setSearch((event.target as HTMLInputElement).value)
        }
        value={search}
        placeholder="Type UID. Example: ORMA0000278954"
      />
      <button
        type="submit"
        className="search__form__button button"
        onClick={(event) => {
          event.preventDefault();
          localStorage.setItem('searchValue', search);
          updateItemsCallback(search);
        }}
      >
        Search
      </button>
    </form>
  );
}
