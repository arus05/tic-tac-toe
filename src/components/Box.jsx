import React from "react"
import xIcon from "./../assets/icon-x.svg"
import oIcon from "./../assets/icon-o.svg"
import hoverXIcon from "./../assets/icon-x-outline.svg"
import hoverOIcon from "./../assets/icon-o-outline.svg"


export default function Box(props){
    return(
        <div className="box" onClick={()=>props.handleBoxClick(props.index)}>
            {
                (props.player === "X" || props.player === "O") &&
                <img
                    src={
                        props.player === "X"?
                        xIcon:
                        oIcon
                    }
                    alt="X or O"
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