import React , {useState, useEffect}from 'react';
import './App.css';

// props should be: 
function Card(props) {
  
  const handleCardClick =()=>{
      console.log(props.face);
  };
  // first render of the card
  useEffect(() => {console.log(props.face)}, [props.face]);
  return (
    <div className="Card" onClick={handleCardClick}>
        <p style={{fontSize: '10vw',  alignSelf: 'stretch', textAlign: 'center'}}>{props.face}</p>
    </div>
  );
}

export default Card;
