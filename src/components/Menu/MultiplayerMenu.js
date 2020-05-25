import React, { useState,useEffect } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

let socket;

const MultiplayerMenu = ({location, history}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [error, setError] = useState({});
    const [roomList, setRoomList] = useState([]);
    //const ENDPOINT = 'https://othollo.herokuapp.com/';
    const ENDPOINT = 'localhost:5000/';

    useEffect(() => {
        socket = io(ENDPOINT);

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.emit('getRoomList', (rooms) => {
            setRoomList(rooms);
        })
    })

    const handleSubmit = (event, join) => {
        socket.emit('checkUser', {name, room, join: join === 'join'}, (err) => { 
            // error.type === '' || 'name' || 'joinRoom' || 'createRoom'
            if(err) {
                setError(err);
            } else {
                history.push(`/game?name=${name}&room=${room}`);
            }
        })
        
    }

    return (
        <div className="multiplayer-menu-container">
            <div className="form username-box">
                <label className="sub-header" htmlFor="name">Username</label>
                <input
                    className="text-input" 
                    type="text"
                    name="name"
                    id="username"
                    placeholder="Enter username..."
                    onChange={(e) => {setName(e.target.value)}}
                />
                <p className="danger-text">{error.type === 'name'? error.message : ''}</p>
            </div>
            <div className="form row">
                <div className="join-room">
                    <label className="sub-header" htmlFor="room">Join a room</label>
                    <select className="selection" name="room" id="room" onChange={(e) => {setRoom(e.target.value)}} size="5" required>
                        <option value="" disabled selected>Select room...</option>
                        {roomList.map(room => {
                            return <option value={room}>{room}</option>;
                        })}
                    </select>
                    <p className="danger-text">{error.type === 'joinRoom'? error.message : ''}</p>
                    <button className="btn btn-primary" onClick={(e) => {handleSubmit(e, 'join')}}>Join!</button>
                </div>
                <h2 className="or">OR</h2>
                <div className="create-room">
                    <input type="hidden" name="name" value={name}></input>
                    <label className="sub-header" htmlFor="room">Create a room</label>
                    <input className="text-input" placeholder="Enter room name..." type="text" name="room" onChange={(e)=> {setRoom(e.target.value)}}></input>
                    <p className="danger-text">{error.type === 'createRoom'? error.message : ''}</p>
                    <button className="btn btn-primary" onClick={(e) => {handleSubmit(e, 'create')}} type="submit">Create!</button>
                </div>
            </div>
        </div>
    );
}

export default MultiplayerMenu;
