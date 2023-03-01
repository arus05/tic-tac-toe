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
    <div className="notification animate__animated animate__fadeIn animate__bounceInDown animate__delay-1s ">
      
      <div
        className= "notification-card animate__animated animate__delay-1s animate__zoomIn"
      >

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
            onClick = {props.startNewRound}
          >
            NEXT ROUND
          </button>
        </div>
      
      </div>

    </div>
  )
}