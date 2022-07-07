import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import TrackList from '../TrackList/TrackList';

const App = () => {
  const [searchResults, setSearchResults] = useState([])


  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} />
          <TrackList searchResults={searchResults} />
        </div>
      </div>
    </div>
  );
};

export default App;
