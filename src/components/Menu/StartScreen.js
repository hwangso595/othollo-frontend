import React from 'react';


const StartScreen = ({toggleOverlay, selectMultiplayer}) => {

    return (
        <div className="start-container">
            <h2 className="header">Select Mode:</h2>
            <div className="btn-row">
                <div className="in-progress">
                    <button className="btn btn-primary" disabled>Single Player</button>
                    <span className="progress-info">Work in progress</span>
                </div>
                <button className="btn btn-primary" onClick={()=> {toggleOverlay(); selectMultiplayer();}}>Multiplayer</button>
            </div>
        </div>
    );
}

export default StartScreen;
