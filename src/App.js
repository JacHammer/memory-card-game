/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
import React, {useEffect, useState} from 'react';
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
  // size of the grid, can be user-defined but keep it for now
  const [gridWidth, setGridWidth] = useState(6);
  const [gridHeight, setGridHeight] = useState(3);

  // cards' state
  const [cardStates, setCardStates] = useState({});
  // scoreboard
  const [tryCount, setTryCount] = useState(0);
  // store current flipped card face
  const [flippedCard, setFlippedCard] = useState({
    face: undefined,
    idx: undefined,
  });

  const incrementWidth = () => {
    setGridWidth(gridWidth + 2);
    setFlippedCard({
      ...flippedCard,
      face: undefined,
      idx: undefined,
    });
  };

  const incrementHeight = () => {
    setGridHeight(gridHeight + 2);
    setFlippedCard({
      ...flippedCard,
      face: undefined,
      idx: undefined,
    });
  };

  // reshuffle and reset all cards
  const reshuffleEmojis = (width, height) => {
    const testEmojiArray = [];
    const emojiRange = [128513, 128591];
    for (let x = emojiRange[0]; x < emojiRange[1]; x++) {
      testEmojiArray.push(String.fromCodePoint(parseInt(x, 10)));
    };
    let emojis = testEmojiArray.slice(0, (width * height)/2);
    emojis.push(...emojis);
    emojis = shuffle(emojis);
    return emojis;
  };

  const revealAllCards = () => {
    // TODO: set all card's isFlipped and isPermanentlyFlipped to true
    // TODO: wait some time
    // TODO: set all card's isFlipped and isPermanentlyFlipped to false
    console.log('imma show all cards!');
  };

  // reset grid to specified width and height
  const resetCardsStates = (isStartOver, width, height) => {
    const emojis = reshuffleEmojis(width, height);
    const defaultCardState = {};
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        defaultCardState[`Card${width * row + col}`] = {
          face: emojis[width * row + col],
          coord: {row: row, col: col},
          cardIdx: width * row + col,
          isFlipped: false,
          isPermanentlyFlipped: false,
        };
      }
    };
    setFlippedCard({
      ...flippedCard,
      face: undefined,
      idx: undefined,
    });
    isStartOver? setCardStates({...defaultCardState}) :
                 setCardStates({...cardStates, ...defaultCardState});
  };

  // set current state of the card to flipped
  const flipCurrentCard = (card) => {
    setCardStates({
      ...cardStates,
      [`Card${card.coord.row*gridWidth+card.coord.col}`]: {
        ...card,
        isFlipped: !card.isFlipped,
      },
    });
    setFlippedCard({
      ...flippedCard,
      face: card.face,
      idx: card.coord.row*gridWidth+card.coord.col,
    });
  };

  // set both cards as permanently flipped and clear flipped card state
  const handleSameCards = (card) => {
    // set flipped cards to be permanently flipped
    setCardStates({
      ...cardStates,
      [`Card${flippedCard.idx}`]: {...cardStates[`Card${flippedCard.idx}`],
        isPermanentlyFlipped: true},
      [`Card${card.coord.row*gridWidth+card.coord.col}`]: {
        ...card,
        isFlipped: true,
        isPermanentlyFlipped: true,
      },
    });
    // reset flipped card
    setFlippedCard({
      ...flippedCard,
      face: undefined,
      idx: undefined,
    });
  };

  // reset both cards if they are not the same
  const handleDifferentCards = (card) => {
    // show the card the player flipped...
    setCardStates({
      ...cardStates,
      [`Card${card.coord.row*gridWidth+card.coord.col}`]: {
        ...card,
        isFlipped: !card.isFlipped,
      },
    });
    // TODO: set all cards property isPermanentlyFlipped: true so
    //       user can't flip any cards during this period
    /*
    code here
    */
    // and hide both card after 200ms
    setTimeout(() => {
      setCardStates({
        ...cardStates,
        [`Card${card.coord.row*gridWidth+card.coord.col}`]: {
          ...card,
          isFlipped: false,
        },
        [`Card${flippedCard.idx}`]: {
          ...cardStates[`Card${flippedCard.idx}`],
          isFlipped: false,
        },
      });

      // reset flipped card
      // TODO: set those cards which has isFlipped: true to
      //       property isPermanentlyFlipped: false
      setFlippedCard({
        ...flippedCard,
        face: undefined,
        idx: undefined,
      });
    }, 200);
  };

  // handle different situations of card states
  const handleCardClick = (card) => {
    setTryCount(tryCount+1);
    console.log(`you tried ${tryCount} time(s)`);
    if (card.isPermanentlyFlipped) {
      console.log('You clicked the same card!');
      return; // avoid extra if-statement checks
    } else if (flippedCard.face === undefined) {
      flipCurrentCard(card);
    } else if (flippedCard.face === card.face &&
               flippedCard.idx !== card.coord.row*gridWidth+card.coord.col) {
      handleSameCards(card);
    } else {
      handleDifferentCards(card);
    }
  };

  // same functionalities as handleCardClick() but with ternary operators
  const ternaryHandleCardClick = (card) =>{
    setTryCount(tryCount+1);
    console.log(`you tried ${tryCount} time(s)`);
    // who needs if if you can do this🤯
    card.isPermanentlyFlipped?
    console.log('You clicked the same card!') :
    flippedCard.face === undefined?
    flipCurrentCard(card) :
    flippedCard.face === card.face &&
    flippedCard.idx !== card.coord.row*gridWidth+card.coord.col?
    handleSameCards(card) :
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
    return Object.values(cards).map(
        (item, idx) => <td key={idx}>{createGameCard(item)}</td>);
  };

  // create a jsx object for the grid
  const constructTable = (width, height) => {
    const widthArray = Array.from(Array(width).keys());
    const heightArray = Array.from(Array(height).keys());
    const content = renderTableCols(cardStates);
    return (
      <table>
        <tbody>
          {heightArray.map(
              (idx, i) => (<tr key={idx}>{widthArray.map(
                  (idx, j)=> content[i*width+j])}</tr>))}
        </tbody>
      </table>);
  };

  const startOver = () => {
    setGridWidth(6);
    setGridHeight(3);
    resetCardsStates(true, 6, 3);
    setTryCount(0);
  };

  // first render will generate a new grid
  useEffect(() => {
    revealAllCards();
    resetCardsStates(false, gridWidth, gridHeight);
  }, []);

  // update grid once width and height are changed by the user
  useEffect(() => {
    resetCardsStates(false, gridWidth, gridHeight);
    setTryCount(0);
  }, [gridWidth, gridHeight]);

  return (
    <div className="App">
      <div >
        <button onClick={incrementWidth}> Add Width </button>
        <button onClick={incrementHeight}> Add Height </button>
        <button
          onClick={startOver}> Reset </button>
        <h1>
          Keep flipping cards until every pair of cards is found!
          <br/>
          You clicked {tryCount} times
        </h1>
      </div>
      <div className="table-div">{constructTable(gridWidth, gridHeight)}</div>
    </div>
  );
}

export default App;
