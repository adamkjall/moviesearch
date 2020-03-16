import React from "react";
import { withRouter, RouteComponentProps} from "react-router-dom";
import "./searchbar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props extends RouteComponentProps {
  value: string;
  toggleLogo: (expanded: boolean) => void;
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
    this.props.toggleLogo(this.state.expanded);
  }

  changeValue(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleKeyPress(event: any) {
    if (event.which === 13) {
      // update url with the search query
      this.props.history.push(`${this.props.match.url}search/${this.state.value}`)
   
      this.setState({ value: "" });
      event.target.value = "";
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

export default withRouter(SearchBar);
