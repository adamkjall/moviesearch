import React from "react";
import "./searchBarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
  active: boolean;
  locked: boolean;
  value: string;
  error: string;
  label: string;
  predicted: string;
  id: number;
}

interface State {
  value: string;
  active: boolean;
  error: string;
  label: string;

}

class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "label"
    };
  }

  changeValue(event: any) {
   
    const value = event.target.value;
    this.setState({ value, error: '' });
   
  }

  handleKeyPress(event: any) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;

    return (
      <div className={fieldClassName}>
        {active && value && predicted && predicted.includes(value) && (
          <p className="predicted">{predicted}</p>
        )}
        <input
          id={1}
          type="text"
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>

        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    );
  }
}

export default SearchBar;
