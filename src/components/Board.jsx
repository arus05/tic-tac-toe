import React from "react"
import Box from "./Box.jsx"

export default function Board(props){
    const board = props.board // 1D Array
    
    const rowEl1 = board.slice(0,3).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index}
                    key = {index}
                    currentPlayer = {props.currentPlayer}
                />
    })
    const rowEl2 = board.slice(3,6).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index+3}
                    key = {index+3}
                    currentPlayer = {props.currentPlayer}
                />
    })
    const rowEl3 = board.slice(6,9).map((element, index)=>{
        return <Box
                    player={element}
                    handleBoxClick = {props.handleBoxClick}
                    index = {index+6}
                    key = {index+6}
                    currentPlayer = {props.currentPlayer}
                />
    })

    return(
        <section className="board">
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