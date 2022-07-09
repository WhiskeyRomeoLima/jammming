import './Track.css';


const Track = (props) => {
    console.log('in Track: ',props)
   const renderAction = () => {
    if (props.isRemoval) {
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

    const addTrack = (event) => {
      props.onAdd(props.track);
    }

    const removeTrack = (event) => {
      props.onRemove(props.track);
    }

    //props = track.name, track.artist, track.album
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{props.track.name}</h3>
          <p>
            {props.track.artist} | {props.track.album}
          </p>
        </div>
        {renderAction()}
      </div>
    );

};

export default Track