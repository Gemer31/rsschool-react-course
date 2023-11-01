import { Component, FormEvent } from 'react';

export interface ISearchProps {
  updateItemsCallback: (newSearchValue: string) => void;
  loading: boolean;
}

export interface ISearchState {
  searchValue: string;
}

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.state = { searchValue: '' };
  }

  componentDidMount() {
    this.setState({
      searchValue: localStorage.getItem('searchValue') as string,
    });
  }

  render() {
    return (
      <form className="form">
        <input
          type="text"
          className="form__input"
          onInput={(event: FormEvent) =>
            this.setState({
              searchValue: (event.target as HTMLInputElement).value.replace(
                /[^a-z]/gi,
                ''
              ),
            })
          }
          value={this.state.searchValue}
          placeholder="Type any value"
          pattern="/[a-zA-Z0-9]/i"
        />
        <button
          type="submit"
          className="form__button"
          onClick={(event) => {
            event.stopPropagation();
            this.props.updateItemsCallback(this.state.searchValue);
          }}
        >
          {this.props.loading ? (
            <span className="loader" />
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>
    );
  }
}
