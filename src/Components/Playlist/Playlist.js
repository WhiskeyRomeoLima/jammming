import  './Playlist.css'
import TrackList from '../TrackList/TrackList'

//From app.js: props =  playlistName, playlistTracks, onRemove, onNameSave, onSave
const Playlist = ({playlistName, playlistTracks, onNameChange, onAdd, onRemove, onSave}) => {
  
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  }
  
  return (
    <div className="Playlist">
      <input
        id="Playlist-name"
        placeholder='Playlist Name'
        defaultValue={playlistName}
        onChange={handleNameChange} />
      <TrackList
        tracks={playlistTracks}
        onAdd={onAdd}
        onRemove={onRemove}
        isRemoval={true} />
      <button
        className="Playlist-save"
        onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
} 

export default Playlist

