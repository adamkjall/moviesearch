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

  //avfyra funktionen från app.tsx - callback
  handleKeyPress(event: any) {
    if (event.which === 13) {
      this.props.getMoviesFromSearch(this.state.value);
    }
  }

  render() {
    // const { active, value, /*error,*/ label } = this.state;
    // const { predicted, locked } = this.props;
    // const fieldClassName = `field ${(locked ? active : active || value) &&
    //   "active"} ${locked && !active && "locked"}`;

    return (
      // <div className={fieldClassName}>
      //   {active && value && predicted && predicted.includes(value) && (
      //     <p className="predicted">{predicted}</p>
      //   )}
      // <div className="field">
      /* <input
          // id={1}
          type="text"
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        /> */
      /* <label htmlFor={1} className={error && "error"}>
      {error || label}
      </label> */
      <div>
        {this.state.expanded ? (
          <div className="field field-active">
            <input
              // id={1}
              type="text"
              placeholder={" Vad vill du se idag?"}
              onChange={this.changeValue.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              // onFocus={() => !locked && this.setState({ active: true })}
              // onBlur={() => !locked && this.setState({ active: false })}
            />
          </div>
        ) : (
          <div className="field">
            <input
              // id={1}
              type="text"
              placeholder={""}
              onChange={this.changeValue.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              // onFocus={() => !locked && this.setState({ active: true })}
              // onBlur={() => !locked && this.setState({ active: false })}
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
