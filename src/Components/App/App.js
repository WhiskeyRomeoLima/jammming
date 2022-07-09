import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

const App = () => {
  // this.state = {
  //   searchResults: [],
  //   playlistName: 'New Playlist',
  //   playlistTracks: [],
  // };
  const [playlistName, setPlaylistName] = useState('');
  const [TrackList, setTrackList] = useState('');
  const [searchResults, setsearchResults] = useState([
    { id: 1, name: 'name1', artist: 'artist1', album: 'album1' },
    { id: 2, name: 'name2', artist: 'artist2', album: 'album2' },
    { id: 3, name: 'name3', artist: 'artist3', album: 'album3' },
  ]);
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: 'playlistname1', artist: 'playlistartist1', album: 'playlistalbum1' },
    { id: 5, name: 'playlistname2', artist: 'playlistartist2', album: 'playlistalbum2' },
    { id: 6, name: 'playlistname3', artist: 'playlistartist3', album: 'playlistalbum3' },
  ]);


  const addTrack = (track) => {
      if (playlistTracks.includes(track.id)) {
        return;
      } else {
        const playlistUpdate = this.state.playlistTracks
        playlistUpdate.push(track);
        //this.setState({ playlistTracks: playlistUpdate });
        setPlaylistTracks(playlistUpdate)
      }
    }
  

  const removeTrack = (track) => {
    let tracks = playlistTracks;
    tracks = tracks.filter((trackIndex) => trackIndex.id !== track.id);
     setPlaylistTracks(tracks);
  };

  const updatePlaylistName = (name) => {
    setPlaylistName(name)
  };

  const savePlaylist = () => {
    const trackURIs = playlistTracks.map((track) => track.uri);
    // return trackURIs;
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      //this.setState({ playlistName: 'New Playlist', playlistTracks: [] });
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
