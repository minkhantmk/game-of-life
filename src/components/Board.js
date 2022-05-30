import React from 'react';
import { useState } from 'react';

const TOP_MARGIN = 10;
const CELL_SIZE = 10;
const WIDTH = 100;
const HEIGHT = 800;

const Board = () => {
    const [cells, setCells] = useState([]);

    const numRows = HEIGHT/CELL_SIZE;
    const numCols = WIDTH/CELL_SIZE;

    // makes the board empty
    const emptyBoard = () => {
        let emptyBoard = [];

        for(let x=0; x<numCols; x++) {
            emptyBoard[x] = [];
            for(let y=0; y<numRows; y++) {
                emptyBoard[x][y] = false;
            }
        }
        return emptyBoard;
    }

    const board = emptyBoard();

    // return an array of active cells with x and y values
    const createCells = () => {
        let cells = [];

        for(let x=0; x<numCols; x++) {
            for(let y=0; x<numRows; y++) {
                if (board[x][y]) {
                    cells.push({x, y});
                }
            }
        }
        return cells;
    }

    // calculates the x and y of the cell clicked and toggles the cell
    const click = (event) => {
        const rect = event.target.getBoundingClientRect();
        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const x = Math.floor(xClick/CELL_SIZE);
        const y = Math.floor(yClick/CELL_SIZE);
        board[x][y] = !board[x][y];
    }

    return (
        <div className="board" onClick={click} style={{ marginTop: 10, width: `${WIDTH}%`, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>
            {cells.map((cell) => (
                <div className="cell" style={{width: CELL_SIZE, hieght: CELL_SIZE}}></div>
            ))}
        </div>
    )
}

export default Board