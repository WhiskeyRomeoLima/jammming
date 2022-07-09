import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

const SearchResults = (props) => {
  console.log('In SearchResults: ', props)
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList
        tracks={props.searchResults}
        onAdd={props.addTrack}
        isRemoval={false} />
    </div>
  );
};

export default SearchResults;
