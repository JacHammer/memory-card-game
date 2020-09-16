import React, {useState} from 'react';
import Card from './Card';
import logo from './logo.svg';
import './App.css';
import './gameBoard.css';
function App() {
  // size of the grid
  const gridSize = 4;
  // the default state when the game is initialized
  const defaultCardState = {};
  // card's location, isFlipped, isPermanantlyFlipped, ...
  const [cardStates, setCardStates] = useState({});
  // scoreboard
  const [score, setScore] = useState({currentScore: 0, maxScore: 0, timeElaped: 0});

  const createGameBoard =(size)=>{
    return (
      <table>
      <tbody>
       <tr>
         <td><Card face='🤔' isFlipped={false} isPermanantlyFlipped={false}/></td>
         <td><Card face='🤔' isFlipped={false} isPermanantlyFlipped={false}/></td>
         <td><Card face='🤔' isFlipped={false} isPermanantlyFlipped={false}/></td>
       </tr>
       <tr>
         <td><Card face='🤔'  isFlipped={false} isPermanantlyFlipped={false}/></td>
         <td><Card face='🤔'  isFlipped={false} isPermanantlyFlipped={false}/></td>
         <td><Card face='🤔'  isFlipped={false} isPermanantlyFlipped={false}/></td>
       </tr>
      </tbody>
     </table>
    );
  };

  return (
    <div className="App">{createGameBoard(4)}</div>
  );
}

export default App;
