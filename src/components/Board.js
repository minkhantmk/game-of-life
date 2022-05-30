import React from 'react';
import Cell from './Cell';
import { useState} from 'react';

const CELL_SIZE = 5;
const WIDTH = 2000;
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

    // calculate the number of neighbours surrounding cell
    const calculateNeighbours = (x, y) => {
        let numNeighbours = 0;

        const directions = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i=0; i<directions.length; i++) {
            let xNew = x + directions[i][0];
            let yNew = y + directions[i][1];

            if (xNew >= 0 && xNew < NUM_COLS && yNew >= 0 && yNew < NUM_ROWS && board[xNew][yNew]) {
                numNeighbours++;
            }
        }
        return numNeighbours;
    }

    // get the values for next board for all cells
    const getNextBoard = () => {
        let newBoard = emptyBoard();

        for (let x=0; x< NUM_COLS; x++) {
            for (let y=0; y<NUM_ROWS; y++) {
                let numNeighbours = calculateNeighbours(x, y);

                if (board[x][y]) {
                    if (numNeighbours === 2 || numNeighbours === 3) {
                        newBoard[x][y] = true;
                    }
                    else {
                        newBoard[x][y] = false;
                    }
                }
                else {
                    if (numNeighbours === 3) {
                        newBoard[x][y] = true;
                    }
                }
            }
        }
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