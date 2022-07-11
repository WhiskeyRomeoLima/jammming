import './TrackList.css';
import Track from '../Track/Track'

// from Playlist: tracks={props.playlistTracks} onAdd={addTrack}, onRemove={props.onRemove} isRemoval={true} 
const TrackList = ( {tracks, onAdd, onRemove, isRemoval}) => {

 let listOfTracks = tracks.map(track => {
        return (<Track 
          track={track}
          key={track.id} 
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
          />)
      })
  return <div className="TrackList"> {listOfTracks} </div>;

};

export default TrackList
