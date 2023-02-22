import React from "react"
import xIcon from "./../assets/icon-x.svg"
import oIcon from "./../assets/icon-o.svg"

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
        </div>
    )
}