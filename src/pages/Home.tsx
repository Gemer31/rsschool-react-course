import { Component } from 'react';
import { Search } from '../components/Search';
import { ItemsList } from '../components/ItemsList';
import { Film, FilmsResponse } from '../models/film.model';

interface IHomeState {
  items: Film[];
  loading: boolean;
  simulateRenderError?: boolean;
}

interface IHomeProps {}

export default class Home extends Component<unknown, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      items: [],
      loading: false,
    };
  }

  public componentDidMount(): void {
    this.handleSearch((localStorage.getItem('searchValue') as string) || '');
  }

  public getStorageData(): Map<string, Film[]> {
    return new Map(
      Object.entries(
        JSON.parse(localStorage.getItem('savedSearch') as string) as {
          [searchValue: string]: Film[];
        }
      )
    );
  }

  public handleSearch = (searchValue: string = ''): void => {
    if (this.state.loading) {
      return;
    }

    localStorage.setItem('searchValue', searchValue || '');

    this.setState({
      items: [],
      loading: true,
    });

    if (localStorage.getItem('savedSearch')) {
      const storageData: Map<string, Film[]> = this.getStorageData();

      if (storageData.get(searchValue)) {
        this.setState({
          items: storageData.get(searchValue) as Film[],
          loading: false,
        });
      } else {
        this.loadFilms(searchValue);
      }
    } else {
      this.loadFilms(searchValue);
    }
  };

  public loadFilms(searchValue: string = ''): void {
    fetch(`https://swapi.dev/api/films?search=${searchValue}`)
      .then((data: Response) => data.json())
      .then((data: FilmsResponse) => {
        if (localStorage.getItem('savedSearch')) {
          const storageData: Map<string, Film[]> = this.getStorageData();
          storageData.set(searchValue, data.results);
          localStorage.setItem(
            'savedSearch',
            JSON.stringify(Object.fromEntries(storageData))
          );
        } else {
          localStorage.setItem(
            'savedSearch',
            JSON.stringify({ [searchValue]: data.results })
          );
        }
        this.setState({
          items: data.results,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Load data error: ', error);
        this.setState({
          items: [],
          loading: false,
        });
      });
  }

  render() {
    if (this.state.simulateRenderError) {
      throw new Error('Custom error');
    }
    return (
      <>
        <Search
          updateItemsCallback={this.handleSearch}
          loading={this.state.loading}
        />
        <ItemsList items={this.state.items} />
        <button
          type="button"
          className="form__button _error"
          onClick={() =>
            this.setState((prev) => ({ ...prev, simulateRenderError: true }))
          }
        >
          Throw error
        </button>
      </>
    );
  }
}
