/* eslint-disable react/prop-types */
/* eslint-disable require-jsdoc */
import React from 'react';
import './App.css';

const unflippedFace = '❔';
function Card(props) {
  // first render of the card
  return (
    <div className="Card" onClick={
      () => {
        props.onClick(
            {face: props.face,
              coord: props.coord,
              isFlipped: props.isFlipped,
              isPermanentlyFlipped: props.isPermanentlyFlipped},
        );
      }
    } >
      <p
        style={{fontSize: '3.5em', textAlign: 'center'}}
      >
        {props.isFlipped ? props.face : unflippedFace}
      </p>
    </div>
  );
}

export default Card;
