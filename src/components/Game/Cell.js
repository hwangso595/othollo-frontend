import React from 'react';

const Cell = (props) => {

    return (
        <span className={`cell ${props.player? `player ${props.player}`: props.available? 'available': ''}` } onClick={(e) => props.clickHandler(props.available, props.coord)}></span>
    );
}

export default Cell;