import React, {useState} from 'react';
import Card from './Card';
import './App.css';
import './gameBoard.css';

function App() {
  // size of the grid
  const [gridSize, setGridSize] = useState(4);

  // the default state when the game is initialized
  let defaultCardState = {};
  let emojis = ['🤔', '😆', '😎', '😂','🤯', '😘','😉', '🤣'];
  emojis.push(...emojis);
  for (let row = 0; row < gridSize ; row++) {
    for (let col = 0; col < gridSize; col++) {
      defaultCardState[`Card${gridSize * row + col}`] = { face: emojis[gridSize * row + col], coord: {row: row, col: col}, cardIdx: gridSize * row + col, isFlipped: false, isPermanentlyFlipped: false};
    }
  };
  // card's location, isFlipped, isPermanentlyFlipped, ...
  const [cardStates, setCardStates] = useState(defaultCardState);
  // scoreboard
  const [score, setScore] = useState({currentScore: 0, maxScore: 0, timeElaped: 0});
  // store current flipped card face
  const [flippedCard, setFlippedCard] = useState({flippedCardFace: undefined, flippedCardIdx: undefined});
  
  const flipCard =(card)=> {
    //setstate
    //sleep
    //setstate
  }

  const handleCardClick = (card) =>{
    // if the card we clicked is permanently flipped, then we do nothing
    if (card.isPermanentlyFlipped === false){
       // if we dont have any non-permanent card flipped, set the clicked card to flipped
      if (flippedCard.flippedCardFace === undefined){
        setCardStates({...cardStates, [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: !card.isFlipped}});
        setFlippedCard({...flippedCard, flippedCardFace: card.face, flippedCardIdx: card.coord.row*gridSize+card.coord.col});
        console.log('I\'m clicked');
      } else{
        // do nothing if clicked on the same card
        if (flippedCard.flippedCardFace === card.face && flippedCard.flippedCardIdx === card.coord.row*gridSize+card.coord.col) {
          console.log('clicked on the same card!');
  
        // clicked on the same card of different location
        } else if (flippedCard.flippedCardFace === card.face && flippedCard.flippedCardIdx !== card.coord.row*gridSize+card.coord.col) {
          console.log('you did it!');
          // set flipped cards to be permanently flipped
          setCardStates({...cardStates, 
                        [`Card${flippedCard.flippedCardIdx}`]: {...cardStates[`Card${flippedCard.flippedCardIdx}`], isPermanentlyFlipped: true},
                        [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: true, isPermanentlyFlipped: true},
                          });
          // reset temp flipped card
          setFlippedCard({...flippedCard, flippedCardFace: undefined, flippedCardIdx: undefined});
  
        // wrong card
        // let the players to have a look at the card they flipped, and hide both cards
        } else if (flippedCard.flippedCardFace !== card.face && flippedCard.flippedCardIdx !== card.coord.row*gridSize+card.coord.col) {
          console.log(`${flippedCard.flippedCardFace} and ${card.face}???`);
          // show the card the player flipped...
          setCardStates({...cardStates, [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: !card.isFlipped}});
          // and hide both card after 200ms
          setTimeout(() => {
            setCardStates({...cardStates, 
                           [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: false},
                           [`Card${flippedCard.flippedCardIdx}`]: {...cardStates[`Card${flippedCard.flippedCardIdx}`], isFlipped: false}
                          });
            // reset flipped card
            setFlippedCard({...flippedCard, flippedCardFace: undefined, flippedCardIdx: undefined});
          }, 200);
        }
      }
    };
    }

  // create a single game card
  const createGameCard = (card) =>(
    <Card face={card.face} coord={card.coord} isFlipped={card.isFlipped} isPermanentlyFlipped={card.isPermanentlyFlipped} onClick={handleCardClick}/> 
  );

  // create jsx object for each card
  const renderTableCols =(cards)=> {
    return Object.values(cards).map((item, idx) => <td key={idx}>{createGameCard(item)}</td>)
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
  return (
    <div className="App">{myTable}</div>
  );
}

export default App; 
