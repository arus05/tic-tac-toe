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
  /*     States                */
  /*---------------------------*/
  const [board, setBoard] = React.useState(
    ["O", "O", "X", "X", "X", "O", "O", "X", "O"]
  )
  const [currentPlayer, setCurrentPlayer] = React.useState("O")
  /*---------------------------*/
  /*     Functions             */
  /*---------------------------*/

  function handleBoxClick(index){
    console.log(index)
    setBoard(prevBoard => {
      let newBoard = [...prevBoard]
      newBoard[index] = currentPlayer 
      return(
        newBoard
      )
    })
  }

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
          <div className="restart-btn">
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
        <Board board={board} handleBoxClick = {handleBoxClick}/>

        {/*---------------*/}
        {/* Bottom Section*/}
        {/*---------------*/}
        <section class="bottom">
          <div id="x-wins" class="bottom-tile">
            <p class="win-label">X (YOU)</p>
            <p class="score">0</p>
          </div>
          <div id="ties" class="bottom-tile">
            <p class="win-label">TIES</p>
            <p class="score">0</p>
          </div>
          <div id="o-wins" class="bottom-tile">
            <p class="win-label">O (CPU)</p>
            <p class="score">0</p>
          </div>
        </section>

      </div>
    </main>
  )
    
}

export default App
