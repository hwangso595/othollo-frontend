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
        console.log(coord);
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
        <>
            {playerType}
            {playerType === gameData.player? 
                <h2>Your turn</h2>
                :
                <h2>Opponent's turn</h2>
            }
            
            {gameData.player? Object.keys(gameData.available).length === 0? 
                <h2>No moves available</h2>
                :
                ''
                :
                ''
            }

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
                <button value="Play Again?" onClick={playAgain}></button>
                :
                ''
            }
        </>
    );
}

export default Game;