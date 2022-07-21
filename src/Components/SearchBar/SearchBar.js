import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch}) => {
  const [searchTerm, setSearchTerm] = useState();

  const search = () => {
    //this.props.onSearch(this.state.term);
    onSearch(searchTerm); 
  };

  const handleTermChange = (e) => {
    //this.setState({ term: e.target.value });
    setSearchTerm(e.target.value)
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}  />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar
