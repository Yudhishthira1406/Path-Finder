import React, { useEffect, useContext , useState} from 'react'

import {texts, endparam, wallcontext} from '../App'
import { walldowncotext } from './Grid'

function Cell(props) {

    const [action, setaction] = useContext(texts)
    const [start, setstart, end, setend] = useContext(endparam)
    const [Wall, setWall] = useContext(wallcontext)
    const [walldown, setwalldown] = useContext(walldowncotext)
    const [col, setcol] = useState("white")
    
   
    
    useEffect(() => {
        
        if(start.r === props.row && start.c === props.col) setcol("blue")
        else if(end.r === props.row && end.c === props.col) setcol("red")
        else if(!Wall[props.row][props.col]) setcol("white")
    }, [start, end])

    const clickHandler = () => {
        if(action.start) {
            setstart(
                {r : props.row,
                c : props.col}
            ) 
            if(Wall[props.row][props.col]) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 0
                    return state
                })
            }
            
            
        }
        if(action.end) {
            setend(
                {
                    r : props.row,
                    c : props.col
                }
            )
            if(Wall[props.row][props.col]) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 0
                    return state
                })
            }
        }
        if(action.wall) {
            if(!((start.r === props.row && start.c === props.col) || (end.r === props.row && end.c === props.col)) ) 

            {setWall((prevState) => {
                let state = prevState
                if(state[props.row][props.col]) {
                    state[props.row][props.col] = 0
                    setcol("white")
                }
                else {
                    state[props.row][props.col] = 0
                    setcol("black")
                }
                return state
            })}
        }
        console.log("Clicked", props.row, props.col)
    }

    const overhandler = () => {
        if(!((start.r === props.row && start.c === props.col) || (end.r === props.row && end.c === props.col)) ){
            if(walldown) {
                setWall((prevState) => {
                    let state = prevState
                    state[props.row][props.col] = 1
                    return state
                })
                setcol("black") 
            }
        }
    }
    
    return (
        <div className = "cell" 
        onClick = {clickHandler} 
        onMouseDown = {() => {
            if(action.wall) {
                setwalldown(true)
            }
        }}
        onMouseOver = {overhandler}
        onMouseUp = {() => setwalldown(false)}
        style = {{backgroundColor : col}} >
            
        </div>
    )
}

export default Cell
