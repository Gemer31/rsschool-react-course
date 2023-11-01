import { Component } from 'react';
import { Film } from '../models/film.model';

export interface IItemsListProps {
  items: Film[];
}

export interface IItemsListState {
  selectedItem?: Film;
}

export class ItemsList extends Component<IItemsListProps, IItemsListState> {
  constructor(props: IItemsListProps) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps: IItemsListProps) {
    if (
      this.state.selectedItem &&
      this.props.items.length === 0 &&
      prevProps.items !== this.props.items
    ) {
      this.setState({});
    }
  }

  render() {
    return (
      <div className="info">
        <div className="list">
          {this.props.items.map((item: Film) => (
            <div
              className={`list-item ${
                this.state.selectedItem?.episode_id === item.episode_id
                  ? '_active'
                  : ''
              }`}
              key={item.episode_id}
              onClick={() => this.setState({ selectedItem: item })}
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="list">
          {this.state.selectedItem && this.props.items.length
            ? this.state.selectedItem.opening_crawl
            : ''}
        </div>
      </div>
    );
  }
}
