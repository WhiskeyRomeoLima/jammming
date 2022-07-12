import './Track.css';


const Track = ({isRemoval, onAdd, onRemove, track}) => {

   const renderAction = () => {

    if (isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>
          -
        </button>
      );
      } else {
        return (
          <button className="Track-action" onClick={addTrack}>
            +
          </button>
        );
      }
    }

    const addTrack = () => {
      onAdd(track);
    }

    const removeTrack = () => {
      onRemove(track);  
    }

    //props = track.name, track.artist, track.album
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{track.name}</h3>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
        {renderAction()}
      </div>
    );

};

export default Track