import React from "react"
import xIcon from "./../assets/icon-x.svg"
import oIcon from "./../assets/icon-o.svg"
import hoverXIcon from "./../assets/icon-x-outline.svg"
import hoverOIcon from "./../assets/icon-o-outline.svg"
import winXIcon from "./../assets/icon-x-dark.svg"
import winOIcon from "./../assets/icon-o-dark.svg"


export default function Box(props){
    /*--------------------------*/
    /* Variables                */
    /*--------------------------*/
    const xWinBgStyle = {
        backgroundColor: "rgb(49, 195, 189)",
    }

    const oWinBgStyle = {
        backgroundColor: "#F2B137",
    }

    const defaultBgStyle = {
        backgroundColor: "#1F3641",
    }

    /*--------------------------*/
    /* Function                 */
    /*--------------------------*/
    function find(val, arr){
        arr.forEach(num => {
            if(num === val){
                return true
            }
        })
        return false
    }

    function finalBgStyle(){
        if(props.winnerCombination.includes(props.index)){ //problem
            if(props.xHasWon){
                return xWinBgStyle
            }
            else{
                return oWinBgStyle
            }
        }
        else{
            return defaultBgStyle
        }
    }

    /*--------------------------*/
    /* Return                   */
    /*--------------------------*/  
    return(
        <div
            className="box"
            id={`box-${props.index}`}
            onClick={()=>{
                if(!props.xHasWon && !props.oHasWon && !props.isTied){
                    props.handleBoxClick(props.index)
                }
            }}
            style = {finalBgStyle()}
        >
            {
                (props.player === "X" || props.player === "O") &&
                <img
                    src={
                        props.winnerCombination.includes(props.index)?
                        (props.player === "X"?
                        winXIcon:
                        winOIcon):
                        (props.player === "X"?
                        xIcon:
                        oIcon)
                    }
                    alt="X or O"
                    className = "animate__animated animate__bounceIn"
                />
            }
            {
                (props.player === "") &&
                <img
                    src={
                        props.currentPlayer === "X"?
                        hoverXIcon:
                        hoverOIcon
                    }
                    alt="X or O"
                    className="box--hover-img"
                />
            }
        </div>
    )
}