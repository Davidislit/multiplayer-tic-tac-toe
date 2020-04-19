import React from 'react';
import './App.css';
import { useImmerReducer } from 'use-immer';
import { loginReducer } from './reducers/LoginReducer';
import { initialState } from './store/InitialState';
import { StateContext, DispatchContext } from './context/StateContext';
import Lobby from './components/Lobby';
import Login from './components/Login';

function App() {

  const [state, dispatch] = useImmerReducer(loginReducer, initialState);

  const { isLoggedIn } = state;

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <>
          { isLoggedIn ? <Lobby /> : <Login /> }
        </>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
