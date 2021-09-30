import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from(Array.from({length: nrows}), r => Array.from({length: ncols}));
    
    for(let r = 0; r < nrows; r++){
      for(let c = 0; c < ncols; c++){
        let rand = Math.random();
        let cell = {coords: r + "-" + c}
        if (rand < (1 * chanceLightStartsOn)){
          cell.isLit = true
        } else {
          cell.isLit = false
        }
        initialBoard[r][c] = cell;
      }
    }
    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for(let r of board){
      for(let c of r){
        if(!c.isLit){
          return false;
        }
      }
    }

    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x].isLit = !boardCopy[y][x].isLit;
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = [...oldBoard];
      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard)
      flipCell(y + 1, x, newBoard)
      flipCell(y - 1, x, newBoard)
      flipCell(y, x + 1, newBoard)
      flipCell(y, x - 1, newBoard)
     
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
  // TODO
    return(<div>
      <h2>You Won!</h2>
    </div>)
  }else{
  // make table board
    return(
      <table className="Board">
    <tbody >
      {board.map(r =>
        <tr className="Board-row"> 
        {r.map(c => 
        <Cell 
        flipCellsAroundMe={() => flipCellsAround(c.coords)} 
        isLit= {c.isLit} 
        key={c.coords}/>
        )}
        </tr>
      )}
    </tbody>
    </table>)
  }
  // TODO
}

export default Board;
