import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import Cell from './Cell';

const BDLEN = 8, BDWIDTH = 8;

function Grid({moveHandler, board, player, available, winner, playerType}) {

    useEffect(() => {
        if (Object.keys(available).length === 0 && !winner) {
            setTimeout(() => {
                moveHandler({coord: null, player})
            }, 3000);
        }
    }, [available])

    function coordInAvailable(available, coord) {
        let coordKey = coord[0]*BDWIDTH + coord[1];
        return coordKey in available;
    }

    function played(coord) {
        moveHandler({coord, player});
    }

    function handleClick(avail, coord) {
        if(avail && playerType === player) {
            console.log([0,0]);
            played(coord);
        }
    }

    const createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < BDLEN; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < BDWIDTH; j++) {
                children.push(
                <td key={BDWIDTH*i+j}>
                    <Cell clickHandler={handleClick} 
                    coord={[i,j]}
                    player={board[i][j]}
                    available={coordInAvailable(available, [i,j])}
                    />
                </td>
                )
            }
            //Create the parent and add the children
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    return (
        <div>
            <table className="grid">
                <tbody>
                    {createTable()}
                </tbody>
            </table>
        </div>
    );
}

Grid.propTypes = {
    moveHandler: PropTypes.func,
    board: PropTypes.array,
    player: PropTypes.string,
    available: PropTypes.object,
    winner: PropTypes.string
}

export default Grid;
