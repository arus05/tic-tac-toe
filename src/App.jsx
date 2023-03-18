import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import 'animate.css'

import Board from "./components/Board.jsx"
import Box from "./components/Box.jsx"
import Menu from "./components/Menu.jsx"
import Notification from "./components/Notification.jsx"
import Conf from './components/Conf.jsx'

import xIcon from "./assets/icon-x.svg"
import oIcon from "./assets/icon-o.svg"
import greyXIcon from "./assets/icon-x-grey.svg"
import greyOIcon from "./assets/icon-o-grey.svg"
import restartIcon from "./assets/icon-restart.svg"
import darkXIcon from "./assets/icon-x-dark.svg"
import darkOIcon from "./assets/icon-o-dark.svg"


/*-------------------------------------------------------*/

/*---------------------------*/
/*     Component             */
/*---------------------------*/
function App() {

  /*---------------------------*/
  /*     Variables             */
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
  const [currentPlayer, setCurrentPlayer] = React.useState("X")
  const [xWinCount, setXWinCount] = React.useState(0)
  const [oWinCount, setOWinCount] = React.useState(0)
  const [tieCount, setTieCount] = React.useState(0)
  const [playerOne, setPlayerOne] = React.useState("X")
  const [playerTwo, setPlayerTwo] = React.useState("O")
  const [gameOn, setGameOn] = React.useState(false)
  const [xHasWon, setXHasWon] = React.useState(false)
  const [oHasWon, setOHasWon] = React.useState(false)
  const [isTied, setIsTied] = React.useState(false)
  const [winnerCombination, setWinnerCombination] = React.useState([])
  // 0: player vs player; 1: cpu easy mode; 2: cpu medium mode; 3: cpu hard mode
  const [gameMode, setGameMode] = React.useState(1)

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
    setCurrentPlayer("X")
    setXHasWon(false)
    setOHasWon(false)
    setIsTied(false)
    setWinnerCombination([])
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

  function resetStatus(){
    setXWinCount(0)
    setOWinCount(0)
    setTieCount(0)
  }

  function togglePlayer(toggled){
    if (toggled !== playerOne){
      setPlayerOne(prevPlayerOne => (
        prevPlayerOne === "X"?
        "O":
        "X"
      ))
      setPlayerTwo(prevPlayerTwo => (
        prevPlayerTwo === "X"?
        "O":
        "X"
      ))
    }
  }

  function startGame(mode){
    // change menu animation
    const menu = document.querySelector(".menu")
    menu.classList.remove("animate__fadeIn")
    menu.classList.add("animate__bounceOutDown")

    setTimeout(()=>{
      handleRestart()
      resetStatus()
      setGameOn(true)
      setGameMode(mode)
    }, 600)
  }

  function startNewRound(){
    const quitBtn = document.querySelector(".notification-card")
    quitBtn.classList.remove("animate__zoomIn")
    quitBtn.classList.remove("animate__delay-1s")
    quitBtn.classList.add("animate__zoomOut")
    setTimeout(handleRestart, 500)
  }

  function quitGame(){
    // update notification animation
    const notification = document.querySelector(".notification-card")
    notification.classList.remove("animate__zoomIn")
    notification.classList.remove("animate__delay-1s")
    notification.classList.add("animate__zoomOut")

    //update main-container animation
    const mainContainer = document.querySelector(".main-container")
    mainContainer.classList.remove("animate__zoomIn")
    mainContainer.classList.add("animate__zoomOut")

    setTimeout(()=>{
      handleRestart()
      resetStatus()
      setGameOn(false)
    }, 500)

  }

  function updateWinner(winner){
    if(winner === "X"){
      setXHasWon(true)
    }
    else{
      setOHasWon(true)
    }
  }

  function getRandomMove(){
    const emptySpots = [];
    board.forEach((spot, index)=>{
      if(spot === ""){
        emptySpots.push(index)
      }
    })
    
    const randomIndex = Math.floor(Math.random()*emptySpots.length)
    const randomSpot = emptySpots[randomIndex]

    return randomSpot
  }

  function minimax(board, isMaximizing){
    const boardState = getBoardState(board);

    // Leaf Nodes
    if(boardState === playerTwo){
      return 1
    }
    else if (boardState === playerOne){
      return -1
    }
    else if (boardState === "tie"){
      return 0
    }

    //Internal Nodes
    if(isMaximizing){
      let bestScore = -100
      let i;
      for(i=0; i<board.length; i++){
        let score
        if(board[i] === ""){
          board[i] = playerTwo
          score = minimax(board, false)
          if(score > bestScore){
            bestScore = score
          }
          board[i] = ""
        }
      }
      return bestScore
    }
    else if(!isMaximizing){
      let worstScore = 100
      let i;
      for(i=0; i<board.length; i++){
        let score
        if(board[i] === ""){
          board[i] = playerOne
          score = minimax(board, true)
          if(score < worstScore){
            worstScore = score
          }
          board[i] = ""
        }
      }
      return worstScore
    }

  }

  function getBestMove(){
    let testBoard = board
    let bestScore = -100
    let bestMove

    for(let i=0; i<testBoard.length; i++){
      let score
      if(testBoard[i] === ""){
        testBoard[i] = playerTwo
        score = minimax(testBoard, false)
        if(score > bestScore){
          bestScore = score
          bestMove = i
        }
        testBoard[i] = ""
      }
    }
    console.log(bestMove)
    return bestMove

  }

  function gameHasEnded(){
    return (xHasWon || oHasWon) || isTied
  }

  function isCPUTurn(){
    return gameMode !== 1 && currentPlayer === playerTwo
  }

  function getBoardState(board){ //returns "O", "X" or "tie"
    // Check for win
    let state;
    WINNING_COMBINATIONS.forEach(combination=>{
      if(areEqual(board[combination[0]], board[combination[1]], board[combination[2]])){
        state = board[combination[0]]
      }
    })
    if(state){
      return state
    }

    // check for tie
    if(board.find(el => el === "") === undefined){ //tie
      return "tie"
    }
    
    return undefined

  }

  /*---------------------------*/
  /*     Effects               */
  /*---------------------------*/

  React.useEffect(()=>{
    if(gameOn){
      // Check if someone has won or tied
      let hasWon = false
      WINNING_COMBINATIONS.forEach(combination=>{
        if(areEqual(board[combination[0]], board[combination[1]], board[combination[2]])){
          hasWon = true
          setWinnerCombination(combination)
          updateStatus(board[combination[0]])
          updateWinner(board[combination[0]])
        }
      })

      if(board.find(el => el === "") === undefined && !hasWon){ //tie
        setTimeout(()=>{
          updateStatus("tie")
          setIsTied(true)
        }, 300)
      }

      // Check if CPU should choose a move
      setTimeout(()=>{

        if(gameMode !== 1){ //only do this when playing against cpu
          if(currentPlayer === playerTwo && !hasWon){
            const CPUMove = getBestMove();
            handleBoxClick(CPUMove);
          }
        }

      }, 500)
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
      { gameOn &&
        (
        <div className="main-container animate__animated animate__zoomIn">

        {/*-----------------------------*/}
        {/* Confetti                    */}
        {/*-----------------------------*/}
        {
          (xHasWon || oHasWon) &&
          <Conf />
        }

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
              className="current-player-img animate__animated animate__bounce"
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
          xHasWon = {xHasWon}
          oHasWon = {oHasWon}
          winnerCombination = {winnerCombination}
          isTied = {isTied}
          isCPUTurn = {isCPUTurn}
        />

        {/*---------------*/}
        {/* Bottom Section*/}
        {/*---------------*/}
        <section className="bottom">
          <div id="x-wins" className="bottom-tile">
            <p className="win-label">
              {`X (${playerOne === "X" ? "P1" : "P2"})`}
            </p>
            <p className="score">{xWinCount}</p>
          </div>
          <div id="ties" className="bottom-tile">
            <p className="win-label">
              TIES
            </p>
            <p className="score">{tieCount}</p>
          </div>
          <div id="o-wins" className="bottom-tile">
            <p className="win-label">
            {`O (${playerOne === "O" ? "P1" : "P2"})`}
            </p>
            <p className="score">{oWinCount}</p>
          </div>
        </section>

        {/*---------------*/}
        {/* Notification  */}
        {/*---------------*/}

        {
          (xHasWon || oHasWon || isTied) &&
          <Notification
            xHasWon = {xHasWon}
            oHasWon = {oHasWon}
            isTied = {isTied}
            quitGame = {quitGame}
            startNewRound = {startNewRound}
          />
        }

      </div>)
      }
      
      {
        !gameOn &&
        <Menu
          playerOne={playerOne}
          togglePlayer={togglePlayer}
          startGame = {startGame}
          gameOn = {gameOn}
        />
      }

    </main>
  )
    
}

export default App
