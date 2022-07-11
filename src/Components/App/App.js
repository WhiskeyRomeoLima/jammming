import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

const App = () => {
  // class state:
  // this.state = {
  //   searchResults: [],
  //   playlistName: 'New Playlist',
  //   playlistTracks: [],
  // };

  //functional state:
  const [playlistName, setPlaylistName] = useState('');
  const [TrackList, setTrackList] = useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  
  const addTrack = (track) => {
    
      if (!playlistTracks.includes(track.id)) {
        console.log(`In addTrack, track = ${track.name}, ${track.id}, ${track.artist}, ${track.album} ${track.uri}`);

        const playlistUpdate = playlistTracks
        
        playlistUpdate.push(track);
        console.log(`After playlistUpdate.push. playlistUpdate = ${playlistUpdate[0].id}`);

        //this.setState({ playlistTracks: playlistUpdate });
        setPlaylistTracks(playlistUpdate)
        console.log(`After setPlaylistTracks. playlistTracks[0].id =  ${playlistTracks[0].id}`);
      }
    }
  

  const removeTrack = (track) => {
    let tracks = playlistTracks;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
     setPlaylistTracks(tracks);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  };

  const savePlaylist = () => {

    const trackURIs = playlistTracks.map(track => track.uri)
    console.log(`in savePlaylist tracks =  ${playlistTracks}`);
    console.log(`In savePlaylist TrackURIs = ${trackURIs}`);
      
    
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName('New Playlist')
      setPlaylistTracks([])
    });

  };

   const search = (searchTerm) => {    
      Spotify.search(searchTerm).then((searchResults) => {
          //this.setState({ searchResults: searchResults });
          setsearchResults(searchResults)
      });
    }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={searchResults}
            onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onAdd={addTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
};

export default App;
