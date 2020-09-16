import React, {useState} from 'react';
import Card from './Card';
import './App.css';
import './gameBoard.css';

function App() {
  // size of the grid
  const [gridSize, setGridSize] = useState(4);

  // the default state when the game is initialized
  let defaultCardState = {};

  for (let row = 0; row < gridSize ; row++) {
    for (let col = 0; col < gridSize; col++) {
      defaultCardState[`Card${gridSize * row + col}`] = { face: '🤔', coord: {row: row, col: col}, cardIdx: gridSize * row + col, isFlipped: false, isPermanentlyFlipped: false};
    }
  };
  console.log(defaultCardState);
  // card's location, isFlipped, isPermanentlyFlipped, ...
  const [cardStates, setCardStates] = useState(defaultCardState);
  // scoreboard
  const [score, setScore] = useState({currentScore: 0, maxScore: 0, timeElaped: 0});
  // store current flipped card face
  const [flippedCard, setFlippedCard] = useState({flippedCardFace: null});

  const handleCardClick = (card) =>{
    
    console.log('I\'m clicked');
    console.log(card);
    
    if (flippedCard.flippedCardFace == null){
      setCardStates({...cardStates, [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: !card.isFlipped}});
      setFlippedCard({flippedCard: `Card${card.coord.row*gridSize+card.coord.col}`});
    } else{
      
    }
  };
  
  // create a single game card
  const createGameCard = (card) =>(
    <Card face={card.face} coord={card.coord} isFlipped={card.isFlipped} isPermanentlyFlipped={card.isPermanentlyFlipped} onClick={handleCardClick}/> 
  );

  const renderTableCols =(cards)=> {
    return Object.values(cards).map((item, idx) => <th>{createGameCard(item)}</th>)
  }

  const content = renderTableCols(cardStates);
  const renderTable =()=> {
    return (
      <table>
        <tbody>
          <tr>{content.slice(0,4)}</tr>
          <tr>{content.slice(4,8)}</tr>
          <tr>{content.slice(8,12)}</tr>
          <tr>{content.slice(12,16)}</tr>
        </tbody>
      </table>

    );
  }

  let myTable = renderTable();
  console.log(myTable);
  return (
    <div className="App">{myTable}</div>
  );
}

export default App; 
