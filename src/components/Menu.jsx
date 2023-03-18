import React from "react"
import xIcon from "./../assets/icon-x.svg"
import oIcon from "./../assets/icon-o.svg"
import darkXIcon from "./../assets/icon-x-dark.svg"
import darkOIcon from "./../assets/icon-o-dark.svg"
import greyXIcon from "./../assets/icon-x-grey.svg"
import greyOIcon from "./../assets/icon-o-grey.svg"

export default function Menu(props){
  /*---------------------------*/
  /*     States                */
  /*---------------------------*/
  const [xHover, setXHover] = React.useState(false)
  const [oHover, setOHover] = React.useState(false)

  /*---------------------------*/
  /*     Functions             */
  /*---------------------------*/

  function handleXHover(){
    setXHover(true)
  }

  function handleXUnhover(){
    setXHover(false)
  }

  function handleOHover(){
    setOHover(true)
  }

  function handleOUnhover(){
    setOHover(false)
  }

  /*---------------------------*/
  /*     Variables             */
  /*---------------------------*/
  /*non-hover styles */
  const selectedStyle = {
    backgroundColor: "#A8BFC9",
  }

  const defaultStyle = {
    opacity: 0,
  }

  /*hover styles */
  const hoverStyle = {
    backgroundColor: "#1F3641",
    opacity: 1,
  }

  /*---------------------------*/
  /*     Return                */
  /*---------------------------*/

  return(
    <div
      className= "menu animate__animated animate__fadeIn"
    >
  
      <div className="menu--logo tilt-in-fwd-tr">
        <div className="menu--logo-img">
          <img src={xIcon} alt="" />
        </div>
        <div className="menu--logo-img">
          <img src={oIcon} alt="" />
        </div>
      </div>

      <div className="menu--choose-player tilt-in-fwd-tr">

        <p className="menu--choose-player-title">
          PICK PLAYER 1'S MARK
        </p>

        <div className="menu--choose-player-toggle">
            <button
              className="menu--choose-player-btn menu--choose-player-o-btn"
              aria-label="X"
              style = {props.playerOne === "X" ?
                        selectedStyle :
                        xHover ?
                          hoverStyle:
                          defaultStyle
                      }
              onClick = {()=>props.togglePlayer("X")}
              onMouseOver={handleXHover}
              onMouseLeave={handleXUnhover}
            >
              <div className="menu--choose-player-icon-img">
                {props.playerOne === "X" &&
                  <img
                    src={darkXIcon} 
                    alt="x icon" />
                }
                {props.playerOne === "O" &&
                  <img
                    src={greyXIcon} 
                    alt=""
                  />
                }
              </div>
            </button>  

            <button
              className="menu--choose-player-btn menu--choose-player-x-btn"
              aria-label="O"
              style = {props.playerOne === "O" ?
                        selectedStyle :
                        oHover ?
                          hoverStyle:
                          defaultStyle
                      }
              onClick = {()=>props.togglePlayer("O")}
              onMouseOver={handleOHover}
              onMouseLeave={handleOUnhover}
            >
              <div className="menu--choose-player-icon-img">
                {props.playerOne === "O" &&
                  <img
                    src={darkOIcon} 
                    alt="o icon" />
                }
                {props.playerOne === "X" &&
                  <img
                    src={greyOIcon} 
                    alt=""
                  />
                }
              </div>
            </button>
        </div>

        <p className="menu--reminder">
          REMEMBER: X GOES FIRST
        </p>

      </div>

      <button
        className="menu--btn menu--cpu-btn slide-in-left"
        onClick={()=>props.startGame(2)}
      >
        NEW GAME (VS CPU)
      </button>

      <button
        className="menu--btn menu--player-btn slide-in-right"
        onClick={()=>props.startGame(1)}
      >
        NEW GAME (VS PLAYER)
      </button>

    </div>
  )
}