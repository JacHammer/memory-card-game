import React , {useState, useEffect}from 'react';
import './App.css';
const unflippedFace = '❔';
// props should be: 
function Card(props) {
  

  // first render of the card
  useEffect(() => {console.log(props.face)}, [props.face]);
  return (
    <div className="Card">
        <p 
          onClick={
              () => {props.onClick(
                                    {face: props.face, 
                                    coord: props.coord, 
                                    isFlipped: props.isFlipped, 
                                    isPermanentlyFlipped: props.isPermanentlyFlipped})}
            } 
          style={{fontSize: '10vw',  alignSelf: 'stretch', textAlign: 'center'}}
        >
            {props.isFlipped ? props.face : unflippedFace}
        
        
        </p>
    </div>
  );
}

export default Card;
