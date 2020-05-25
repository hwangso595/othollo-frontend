import React, {useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import StartScreen from './components/Menu/StartScreen';
import MultiplayerMenu from './components/Menu/MultiplayerMenu';
import Game from './components/Game/Game';

function App() {
  const [showStart, setShowStart] = useState(true);
  const [startGame, setStart] = useState(false);
  const [showMultiplayerOption, setShowMultiplayerOption] = useState(false);

  const toggleShow = () => {
    setShowStart(!showStart);
  }

  const toggleStart = () => {
    setStart(!startGame);
  }

  const toggleMultiplayerOption = () => {
    setShowMultiplayerOption(!showMultiplayerOption);
  }

  return (
    <Router> 
      {showStart && <Route 
          path="/" exact
          render={()=><StartScreen toggleOverlay={toggleShow} selectMultiplayer={toggleMultiplayerOption}/>}
          />
      }
      {showMultiplayerOption && 
        <Route 
          path="/" exact
          component={MultiplayerMenu}
        />
      }
      <Route path="/game" component={Game}/>
    </Router>
  );
}

export default App;
