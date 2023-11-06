import './PagesBar.scss';
import { useState } from 'react';
import { IPage } from '../../models/organization.model';

export interface IPagesBarProps {
  loading: boolean;
  data: IPage;
  updatePagesData: (newPage: number, newSize: number) => void;
}

export function PagesBar({ loading, data, updatePagesData }: IPagesBarProps) {
  const [size, setSize] = useState(data?.pageSize);

  const changePage = (type: '+' | '-'): void => {
    const newPage: number =
      type === '+' ? data.pageNumber + 1 : data.pageNumber - 1;
    if (!loading) {
      updatePagesData(newPage, data.pageSize);
    }
  };

  return (
    <div className="pages-bar">
      <div className="pages-bar__state">
        <button
          type="button"
          disabled={data?.firstPage}
          className="button pages-bar__button"
          onClick={() => changePage('-')}
        >
          <div className="pages-bar__icon _arrow" />
        </button>
        <span className="pages-bar__page">{data?.pageNumber + 1}</span>
        <button
          type="button"
          className={
            'button pages-bar__button' + (data?.lastPage ? ' _disable' : '')
          }
          onClick={() => changePage('+')}
        >
          <div className="pages-bar__icon _arrow _rotate" />
        </button>
      </div>
      <form className="pages-bar__form">
        <input
          className="input pages-bar__form-field"
          type="number"
          max={100}
          min={1}
          value={size}
          onInput={(event) =>
            setSize((event.target as HTMLInputElement).value as number)
          }
        />
        <button
          type="submit"
          className="button"
          onClick={(event) => {
            event.preventDefault();
            !loading && updatePagesData(0, size);
          }}
        >
          <div className="pages-bar__icon _reload" />
        </button>
      </form>
    </div>
  );
}
