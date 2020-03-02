import React from 'react';
import "./searchBarStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

interface Props {
  
}

interface State {
  value: string
}



class SearchBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({value: event.target.value});
  }  

  handleSubmit(event: any) {
    alert('A movie was submitted: ' + this.state.value);
      event.preventDefault();
  }

  render() {
    return (
      <div className="searchBarContainer">
        <form onSubmit={this.handleSubmit}>
          <label>Movie-Search

          <input type="text" value= {this.state.value} onChange={this.handleChange}/>
          </label>
        <input type="submit" value="Submit" />
        </form>
        
        <div>
        < FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
    )
  };
}

export default SearchBar