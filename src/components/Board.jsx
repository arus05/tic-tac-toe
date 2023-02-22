import React from "react"
import Box from "./Box.jsx"

export default function Board(props){
    const board = props.board // 1D Array
    
    const rowEl1 = board.slice(0,3).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index}
                />
    })
    const rowEl2 = board.slice(3,6).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index+3}
                />
    })
    const rowEl3 = board.slice(6,9).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index+6}
                />
    })

    return(
        <section class="board">
            <div className="board--row">
                {rowEl1}
            </div>
            <div className="board--row">
                {rowEl2}
            </div>
            <div className="board--row">
                {rowEl3}
            </div>
        </section>
    )
}