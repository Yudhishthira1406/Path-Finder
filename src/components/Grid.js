import React, {useEffect, useState} from 'react'
import './css/Grid.css'
import Cell from './Cell'


export const walldowncotext = React.createContext()

function Grid() {
    
    const [matrix, setmatrix] = useState([])
    
    const [walldown, setwalldown] = useState(false)
    useEffect(() => {
        let mat = []
        for(let i = 0; i <= 20; ++i) {
            let row = []
            for(let j = 0; j <= 50; ++j) {
                row.push({r : i, c : j})
            }
            mat.push(row)
        }
        setmatrix(mat)
       
    }, [])

    
    return (
        <div className = "grid-container">
            <walldowncotext.Provider value = {[walldown, setwalldown]}>
            <table>
            {matrix.map(
                (row) => (
                    <tr>
                    {row.map(
                        (cell) => 
                            <th><Cell row = {cell.r} col = {cell.c}></Cell> </th>
                        
                    )}
                    </tr>
                )
            )}
        </table>
            </walldowncotext.Provider>
        
        </div>
    )
}

export default Grid
