import React from 'react';


const StartScreen = ({toggleOverlay, selectMultiplayer}) => {

    return (
        <div className="start-container">
            Select Mode:
            <button disabled>Single Player</button>
            <button onClick={()=> {toggleOverlay(); selectMultiplayer();}}>Multiplayer</button>
        </div>
    );
}

export default StartScreen;
