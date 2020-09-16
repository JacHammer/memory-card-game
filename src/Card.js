import React from 'react';
import './App.css';

const unflippedFace = '❔';
function Card(props) {
  

  // first render of the card
  return (
    <div className="Card" onClick={
        () => {props.onClick(
                              {face: props.face, 
                              coord: props.coord, 
                              isFlipped: props.isFlipped, 
                              isPermanentlyFlipped: props.isPermanentlyFlipped}
                              )}
      } >
        <p 
          style={{fontSize: '4em', textAlign: 'center'}}
        >
          {props.isFlipped ? props.face : unflippedFace}
        </p>
    </div>
  );
}

export default Card;
