import React from "react"

export default function Notification(props){
  /*---------------------------*/
  /*     Variables             */
  /*---------------------------*/
  let notificationMsg = ""
  if(props.xHasWon){
    notificationMsg = "X Takes The Round"
  }
  else if(props.oHasWon){
    notificationMsg = "O Takes The Round"
  }
  else{
    notificationMsg = "Round Tied"
  }


  /*---------------------------*/
  /*     Return                */
  /*---------------------------*/
  return(
    <div className="notification fade-in">

      <h2 className="notification--title">
        {notificationMsg}
      </h2>
      <div className="notification--btn-container">
        <button
          className="notification--quit-btn"
          onClick = {props.quitGame}
        >
            QUIT
        </button>
        <button
          className="notification--next-round-btn"
          onClick = {props.handleRestart}
        >
          NEXT ROUND
        </button>
      </div>

    </div>
  )
}