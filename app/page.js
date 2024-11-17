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

  //states to store board records
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
    <main className="">
      <div className="py-[3%] max-md:py-[15%]">
        <h1 className="text-6xl text-center font-black text-black">TicTacToe</h1>
      </div>
      <div className="flex justify-center items-center">
        <div style={{border:"3px solid #000"}} className="flex justify-center align-middle items-center h-2/3 w-1/2 max-md:w-2/3 flex-wrap">
          {
            tic.map((tic, id) => (
              <div key={id} onClick={() => { changePlayer(id); }} style={{border:"3px solid #000"}} className="cell-border h-[150px] max-md:h-[100px] w-1/3 flex justify-center items-center text-5xl"> <p className={`${(tic==="X"?"text-red-600" : "text-blue-600")}`}>{tic}</p>
              </div>
            ))
          }
        </div>
      </div>

      {win == null && <div className="text-center py-4 text-3xl text-gray-800"> Turn of : <span className="text-fuchsia-600">( {player == null ? "X" : player} )</span> </div>}
      {win != null && <div className="text-center py-4 text-3xl">( {win} ) win <button className="text-red-600" onClick={() => { changeTic(emptyArr); setWinner(null); }}>click to restart game</button> </div>}
      {<p className="text-center py-2 text-3xl text-gray-600"><span className="text-red-600">X wins :  {xWin} & </span><span className="text-blue-600"> O wins : {oWin}</span> <span className="text-green-600"> & draw : {draw}</span> </p>}

    </main>
  );
}
