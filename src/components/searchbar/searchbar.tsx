import React from "react";
import "./searchbar.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  value: string;
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

  expandSearchBar(event: any) {
    this.setState(state => ({
      expanded: !state.expanded
    }));
  }
  changeValue(event: any) {
    const inputValue = event.target.value;
    this.setState({ value: this.props.value });
  }

  handleKeyPress(event: any) {
    if (event.which === 13) {
      this.setState({ value: this.props.value });
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
      <div className="searchIcon" onClick={this.expandSearchBar}>
        {this.state.expanded ? (
          <div className="field">
            <input
              // id={1}
              type="text"
              placeholder={"test"}
              onChange={this.changeValue.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              // onFocus={() => !locked && this.setState({ active: true })}
              // onBlur={() => !locked && this.setState({ active: false })}
            />
          </div>
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </div>
    );
  }
}

export default SearchBar;
