"use client"

import { useState } from "react";

export default function Home() {
  const emptyArr = ["", "", "", "", "", "", "", "", ""];
  //empty array to store board values
  const [tic, changeTic] = useState(emptyArr)
  //state to change based on the player turn
  const [player, setPlayer] = useState(null)
  //state for player who win the game
  const [win, setWinner] = useState(null)
  //board records state
  const [xWin, changeX] = useState(0)
  const [oWin, changeO] = useState(0)
  const [draw, setDraw] = useState(0)

  //combo that makes winner
  const winner = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]];
  function changePlayer(id) {

    if (tic[id] === "" && win == null) {

      let newArr = [...tic];
      changeTic(newArr);

      if (player === "X") {
        setPlayer("O");
        newArr[id] = "X";
      } else if (player === "O") {
        setPlayer("X")
        newArr[id] = "O";
      } else if (player === null) {
        setPlayer("O")
        newArr[id] = "X";
      }

      //check for the winner using every method
      function checkWinner() {
        for (let i = 0; i < winner.length; i++) {
          if (winner[i].every(winner => newArr[winner] === "X")) {
            setWinner("X")
            changeX(xWin + 1)
            setPlayer("O")
          }
          if (winner[i].every(winner => newArr[winner] === "O")) {
            setWinner("O")
            changeO(oWin + 1)
            setPlayer("X")
          }
        }
      }

      //check for draw by checking that all values in the array is filled
      function checkDraw() {
        let drawStatus = true;
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i] === "") {
            drawStatus = false
          }
        }
        if (drawStatus === true) {
          setWinner("draw")
          setDraw(draw + 1);
        }
      }

      checkWinner();
      checkDraw();

    }
  }

  return (
    <main>
      <div className="py-[3%] max-md:py-[15%]">
        <h1 className="text-6xl text-center font-black">TicTacToe</h1>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-center align-middle items-center h-2/3 w-1/2 max-md:w-2/3 flex-wrap cell-border">
          {
            tic.map((tic, id) => (
              <div key={id} onClick={() => { changePlayer(id); }} className="cell-border h-[150px] max-md:h-[100px] w-1/3 flex justify-center items-center text-5xl"> {tic}
              </div>
            ))
          }
        </div>
      </div>

      {win == null && <div className="text-center py-4 text-3xl"> Turn of : ( {player == null ? "X" : player} ) </div>}
      {win != null && <div className="text-center py-4 text-3xl">( {win} ) win <button className="text-red-600" onClick={() => { changeTic(emptyArr); setWinner(null); }}>click to restart game</button> </div>}
      {<p className="text-center py-2 text-3xl">X wins : {xWin} times & O wins : {oWin} times & draw : {draw} times </p>}

    </main>
  );
}
