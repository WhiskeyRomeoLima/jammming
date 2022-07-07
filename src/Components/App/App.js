import './App.css';
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults';

const App = () => {
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div class="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults /></div>
      </div>
    </div>
  );
};

export default App;
