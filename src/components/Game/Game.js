import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Grid from './Grid';

let socket;

const Game = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [playerType, setPlayerType] = useState('');
    const [userList, setUserList] = useState([]);
    const [gameData, setGameData] = useState({
        board: [],
        player: '',
        available: [],
        winner: ''
    });
    const ENDPOINT = 'https://othollo.herokuapp.com/';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);

        socket = io(ENDPOINT);
        console.log(socket);
        socket.emit('join', {name, room}, (message) => { 
            if(message) console.log(message);
        });

        setName(name);
        setRoom(room);

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('playerType', playerType => {
            setPlayerType(playerType);
        })
        
        socket.on('move', data => {
            setGameData(data);
        })
        socket.on('userList', list => {
            setUserList(list);
        })
    })

    const moveHandler = ({coord, player}) => {
        socket.emit('sendMove', {coord, player}, (message) => { 
            if(message) console.log(message);
        });
    }

    const playAgain = () => {
        socket.emit('playAgain', (message) => { 
            if(message) console.log(message);
        });
    }

    return (
        <div className="game-container">
            <h2 className="player-display">
                You are {playerType === 'player1' ? 'player 1' : playerType === 'player2' ? 'player 2' : 'a spectator'}
            </h2>
            <h2 className="turn-display">
                {!gameData.winner ? playerType === gameData.player ? "Your turn" : "Opponent's turn" : ""}
            </h2>
            
            
            
            {(!gameData.winner && gameData.player && Object.keys(gameData.available).length === 0)? 
                <h2>No moves available</h2>
                :
                ''
            }

            <h2 className="winner-display">
                {gameData.winner ? playerType === gameData.winner? "You win!" : gameData.winner + " wins!" : ""}
            </h2>

            {gameData.player?
                <Grid 
                    available={gameData.available} 
                    player={gameData.player}
                    board={gameData.board} 
                    winner={gameData.winner} 
                    playerType={playerType}
                    moveHandler={moveHandler}
                />
                :
                'Loading'
            }
            {gameData.winner ? 
                <button className="btn btn-play-again" onClick={playAgain}>Play Again?</button>
                :
                ''
            }
        </div>
    );
}

export default Game;