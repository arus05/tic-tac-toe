import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Board from "./components/Board.jsx"
import Box from "./components/Box.jsx"
import xIcon from "./assets/icon-x.svg"
import oIcon from "./assets/icon-o.svg"
import greyXIcon from "./assets/icon-x-grey.svg"
import greyOIcon from "./assets/icon-o-grey.svg"
import restartIcon from "./assets/icon-restart.svg"

/*-------------------------------------------------------*/

/*---------------------------*/
/*     Component             */
/*---------------------------*/
function App() {

  /*---------------------------*/
  /*     Variables                */
  /*---------------------------*/

  const emptyBoard = ["", "", "", "", "", "", "", "", ""]

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  /*---------------------------*/
  /*     States                */
  /*---------------------------*/

  const [board, setBoard] = React.useState(
    ["", "", "", "", "", "", "", "", ""]
  )
  const [currentPlayer, setCurrentPlayer] = React.useState("O")

  const [xWinCount, setXWinCount] = React.useState(0)
  const [oWinCount, setOWinCount] = React.useState(0)
  const [tieCount, setTieCount] = React.useState(0)

  /*---------------------------*/
  /*     Functions             */
  /*---------------------------*/

  function handleBoxClick(index){
    if(board[index] === ""){

      setBoard(prevBoard => {
        let newBoard = [...prevBoard]
        newBoard[index] = currentPlayer 
        return(
          newBoard
        )
      })

      setCurrentPlayer(prevPlayer => (
        prevPlayer === "X"?
        "O":
        "X"
      ))

    }
  }
  
  function handleRestart(){
    setBoard(emptyBoard)
    console.log("change board")
    setCurrentPlayer("O")
    console.log("change player")
  }

  function areEqual(a, b, c){
    if(a === b && b === c && c !== ""){
      return true
    }
  }

  function updateStatus(winner){
    if(winner == "X"){
      setXWinCount(prevCount => prevCount+1)
    }
    else if(winner == "O"){
      setOWinCount(prevCount => prevCount+1)
    }
    else{
      setTieCount(prevCount => prevCount+1)
    }
  }

  /*---------------------------*/
  /*     Effects               */
  /*---------------------------*/

  // Check if someone has won
  React.useEffect(()=>{
    let hasWon = false
    WINNING_COMBINATIONS.forEach(combination=>{
      if(areEqual(board[combination[0]], board[combination[1]], board[combination[2]])){
        hasWon = true
        updateStatus(board[combination[0]])
        handleRestart()
      }
    })

    if(board.find(el => el === "") === undefined && !hasWon){
      updateStatus("")
      handleRestart()
    }

  }, [board])

  /*---------------------------*/
  /*     Return                */
  /*---------------------------*/
  return(
    <main>
      {/*-----------------------------*/}
      {/* Container for the main page */}
      {/*-----------------------------*/}
      <div className="main-container">

        {/* top section */}
        <section className="top">
          <div className="top-logo">
            <img className="top-logo-img" src={xIcon} alt="" />
            <img className="top-logo-img" src={oIcon} alt="" />
          </div>
          <div className="current-player">
            <img
              src={
                currentPlayer === "X"?
                greyXIcon: 
                greyOIcon
              }
              alt=""
              className="current-player-img"
            />
            <p className="current-player-text">TURN</p>
          </div>
          <div className="restart-btn" onClick={handleRestart}>
            <img
              src={restartIcon}
              alt=""
              className="restart-btn-img"
            />
          </div>
        </section>

        {/*----------------*/}
        {/* TicTacToe Board*/}
        {/*----------------*/}
        <Board
          board={board}
          handleBoxClick = {handleBoxClick}
          currentPlayer = {currentPlayer}
        />

        {/*---------------*/}
        {/* Bottom Section*/}
        {/*---------------*/}
        <section className="bottom">
          <div id="x-wins" className="bottom-tile">
            <p className="win-label">X (YOU)</p>
            <p className="score">{xWinCount}</p>
          </div>
          <div id="ties" className="bottom-tile">
            <p className="win-label">TIES</p>
            <p className="score">{tieCount}</p>
          </div>
          <div id="o-wins" className="bottom-tile">
            <p className="win-label">O (CPU)</p>
            <p className="score">{oWinCount}</p>
          </div>
        </section>

      </div>
    </main>
  )
    
}

export default App
