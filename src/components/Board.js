import React from 'react';
import Cell from './Cell';
import { useState} from 'react';

const CELL_SIZE = 5;
const WIDTH = 800;
const HEIGHT = 800;
const NUM_ROWS = HEIGHT / CELL_SIZE;
const NUM_COLS = WIDTH / CELL_SIZE;

const Board = () => {

    // makes the board empty
    const emptyBoard = () => {
        let emptyBoard = [];

        for(let x=0; x<NUM_COLS; x++) {
            emptyBoard[x] = [];
            for(let y=0; y<NUM_ROWS; y++) {
                emptyBoard[x][y] = false;
            }
        }
        return emptyBoard;
    }

    // states
    const [cells, setCells] = useState([]);
    const [board, setBoard] = useState(emptyBoard());

    // return an array of active cells with x and y values
    const createCells = () => {
        let cells = [];

        for(let x=0; x<NUM_COLS; x++) {
            for(let y=0; y<NUM_ROWS; y++) {
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

        let newBoard = [...board];
        newBoard[x][y] = !(newBoard[x][y]);

        setBoard(newBoard);
        setCells(createCells());
    }

    return (
        <div className="board" onClick={click} style={{ marginTop: 10, width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}>
            {cells.map((cell) => (
                <Cell key={`${cell.x}${cell.y}`} x={cell.x} y={cell.y} size={CELL_SIZE}></Cell>
            ))}
        </div>
    )
}

export default Board