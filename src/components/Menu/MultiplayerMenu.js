import React, { useState } from 'react';

const MultiplayerMenu = ({toggleOverlay, startGame}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [newRoom, setNewRoom] = useState('');

    const handleSubmit = async (event) => {
        try{
            if(!name || !newRoom) {
                event.preventDefault();
            } else {
                startGame();
                toggleOverlay();
            }
        } catch {
            
        }
    }

    return (
        <div className="multiplayer-container">
            <form action="/game" method="get">
                <div className="form">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        name="name"
                        id="username"
                        placeholder="Enter username..."
                        onChange={(e) => {setName(e.target.value)}}
                        required
                    />
                </div>
                <div class="form">
                    <label htmlFor="room">Room</label>
                    <select name="room" id="room" onChange={(e) => {setRoom(e.target.value)}} required>
                        <option value="" disabled defaultValue>Select Room</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Python">Python</option>
                        <option value="PHP">PHP</option>
                        <option value="C#">C#</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Java">Java</option>
                    </select>
                </div>
                <button type="submit" class="btn">Join Room</button>
            </form>
            <h2>OR</h2>
            <form onSubmit={handleSubmit} action="/game" method="get">
                <input type="hidden" name="name" value={name}></input>
                <input placeholder="Room" type="text" name="room" onChange={(e)=> {setNewRoom(e.target.value)}}></input>
                <button type="submit">Create Room</button>
            </form>
        </div>
    );
}

export default MultiplayerMenu;
