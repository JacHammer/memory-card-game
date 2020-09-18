/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import React, {useState} from 'react';
import Card from './Card';
import './App.css';
import './gameBoard.css';

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function App() {
  // size of the grid, must be an even number greater than 2
  const [gridSize] = useState(4);

  // the default state when the game is initialized
  const defaultCardState = {};
  const testEmojiArray = [];

  // generate random cards
  const emojiRange = [128513, 128591];
  for (let x = emojiRange[0]; x< emojiRange[1]; x++) {
    testEmojiArray.push(String.fromCodePoint(parseInt(x, 10)));
  };
  let emojis = testEmojiArray.slice(0, gridSize*2);
  emojis.push(...emojis);
  emojis = shuffle(emojis);
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      defaultCardState[`Card${gridSize * row + col}`] = {face: emojis[gridSize * row + col], coord: {row: row, col: col}, cardIdx: gridSize * row + col, isFlipped: false, isPermanentlyFlipped: false};
    }
  };

  // cards' state
  const [cardStates, setCardStates] = useState(defaultCardState);
  // scoreboard
  const [tryCount, setTryCount] = useState(0);
  // store current flipped card face
  const [flippedCard, setFlippedCard] = useState({flippedCardFace: undefined, flippedCardIdx: undefined});

  // set current state of the card to flipped and set flipped card state to this card
  const flipCurrentCard = (card) => {
    setCardStates({...cardStates, [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: !card.isFlipped}});
    setFlippedCard({...flippedCard, flippedCardFace: card.face, flippedCardIdx: card.coord.row*gridSize+card.coord.col});
  };

  // set both cards as permanently flipped and clear flipped card state if two same cards are flipped
  const handleSameCards = (card) => {
    // set flipped cards to be permanently flipped
    setCardStates({...cardStates,
      [`Card${flippedCard.flippedCardIdx}`]: {...cardStates[`Card${flippedCard.flippedCardIdx}`], isPermanentlyFlipped: true},
      [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: true, isPermanentlyFlipped: true},
    });
    // reset flipped card
    setFlippedCard({...flippedCard, flippedCardFace: undefined, flippedCardIdx: undefined});
  };

  // reset both cards if they are not the same
  const handleDifferentCards = (card) => {
    // show the card the player flipped...
    setCardStates({...cardStates, [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: !card.isFlipped}});
    // and hide both card after 200ms
    setTimeout(() => {
      setCardStates({...cardStates,
        [`Card${card.coord.row*gridSize+card.coord.col}`]: {...card, isFlipped: false},
        [`Card${flippedCard.flippedCardIdx}`]: {...cardStates[`Card${flippedCard.flippedCardIdx}`], isFlipped: false},
      });
      // reset flipped card
      setFlippedCard({...flippedCard, flippedCardFace: undefined, flippedCardIdx: undefined});
    }, 200);
  };

  const handleCardClick = (card) =>{
    setTryCount(tryCount+1);
    console.log(`you tried ${tryCount} time(s)`);
    // who needs if if you can do this🤯
    card.isPermanentlyFlipped? console.log('You clicked the same card!') :
    flippedCard.flippedCardFace === undefined? flipCurrentCard(card) :
    flippedCard.flippedCardFace === card.face &&
    flippedCard.flippedCardIdx !== card.coord.row*gridSize+card.coord.col? handleSameCards(card) :
    handleDifferentCards(card);
  };

  // create a single game card
  const createGameCard = (card) =>(
    <Card
      face={card.face}
      coord={card.coord}
      isFlipped={card.isFlipped}
      isPermanentlyFlipped={card.isPermanentlyFlipped}
      onClick={handleCardClick}
    />
  );

  // create jsx object for each card
  const renderTableCols = (cards) => {
    return Object.values(cards).map((item, idx) => <td key={idx}>{createGameCard(item)}</td>);
  };

  const renderTable = () => {
    const content = renderTableCols(cardStates);
    return (
      <table>
        <tbody>
          <tr>{content.slice(0, 4)}</tr>
          <tr>{content.slice(4, 8)}</tr>
          <tr>{content.slice(8, 12)}</tr>
          <tr>{content.slice(12, 16)}</tr>
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <div >
        <h1>Keep flipping cards until every pair of cards are found!<br/> You clicked {tryCount} times</h1>
      </div>
      <div className="table-div">{renderTable()}</div>
    </div>

  );
}

export default App;
