import  './Playlist.css'
import TrackList from '../TrackList/TrackList'

//From app.js: props =  playlistName, playlistTrack, onRemove, onNameSave, onSave
const Playlist = (props) => {
  console.log('In Playlist: ', (props));
  
  const handleNameChange = (event) => {
    props.onNameChange(event.target.value);
  }

  
  return (
    <div className="Playlist">
      <input
        id="Playlist-name"
        defaultValue={props.playlistName}
        onChange={handleNameChange} />
      <TrackList
        tracks={props.playlistTracks}
        onAdd ={props.onAdd}
        onRemove={props.onRemove}
        isRemoval={true} />
      <button
        className="Playlist-save"
        onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
} 

export default Playlist

