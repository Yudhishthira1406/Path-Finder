import React, { useState, useEffect } from 'react';

import './App.css';

import Grid from './components/Grid';

export const texts = React.createContext();
export const endparam = React.createContext();
export const wallcontext = React.createContext();

function App() {

  const initAction = {
    start : false,
    end : false,
    wall : false
  }

  let initwall = []
  
  for(let i = 0; i <= 20; ++i) {
    let row = []
    for(let j = 0; j <= 30; ++j) {
      row.push(0)
    }
    initwall.push(row)
  }
  const [Wall, setWall] = useState(initwall)

  const [action, setaction] = useState(initAction)


  const initstart = {r : -1, c : -1}

  const [startcell, setstartcell] = useState(initstart)
  const [endcell, setendcell] = useState(initstart)

  const startHandler = () => {
    setaction(() =>
      {
        return {...initAction,
        start : true
        }
      }
    )
    
  } 

  const endHandler = () => {
    setaction(() =>
      {
        return {...initAction,
        end : true
        }
      }
    )
    console.log(action)
  } 

  const reset = () => {
    setaction(initAction)
    setstartcell(initstart)
    setendcell(initstart)
    setWall(initwall)
  }

  const wallHandler = () => {
    setaction(
      () =>
      {
        return {
          ...initAction,
          wall : true
        }
      }
    )
  }

    useEffect(
      () => {
        console.log(action)
      }, [action]
    )
  
  return (
    <div className = "App">
      <div className = "button-container">
        <button onClick = {startHandler}>Select start cell</button>
        <button onClick = {endHandler}>Select end cell</button>
        <button onClick = {wallHandler}>Select walls</button>
        <button onClick = {reset}>Reset</button>
      </div>
      <texts.Provider value = {[action, setaction]}>
        <endparam.Provider value = {[startcell, setstartcell, endcell, setendcell]}>
          <wallcontext.Provider value = {[Wall, setWall]}>
            <Grid />
          </wallcontext.Provider>
        </endparam.Provider>
      </texts.Provider>
    </div>
  );
}

export default App;
