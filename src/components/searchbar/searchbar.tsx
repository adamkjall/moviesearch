import React from "react";
import "./searchbar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  value: string;
  getMoviesFromSearch: Function;
}

interface State {
  expanded: boolean;
  value: string;
}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      expanded: false,
      value: ""
    };
    this.expandSearchBar = this.expandSearchBar.bind(this);
  }

  expandSearchBar() {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  }

  changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleKeyPress(event: any) {
    if (event.which === 13) {
      this.props.getMoviesFromSearch(this.state.value);
    }
  }

  render() {
    return (
      <div>
        {this.state.expanded ? (
          <div className="field field-active">
            <input
              type="text"
              placeholder={" Up for a movie?"}
              onChange={this.changeValue.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
        ) : (
          <div className="field">
            <input
              type="text"
              placeholder={""}
              onChange={this.changeValue.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
            />
          </div>
        )}
        <div className="searchButton">
          <FontAwesomeIcon icon={faSearch} onClick={this.expandSearchBar} />
        </div>
      </div>
    );
  }
}

export default SearchBar;
