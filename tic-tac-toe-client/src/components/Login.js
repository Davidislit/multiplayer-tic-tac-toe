import React, {useContext} from 'react'
import {DispatchContext, StateContext} from "../context/StateContext";

export default function Login() {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);

    const { username, password, isLoading, error } = state;

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('TEST?');
    }

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                {error && <p className="error">{error}</p>}
                <p>Please Login!</p>
                <input
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e =>
                        dispatch({
                            type: 'field',
                            fieldName: 'username',
                            payload: e.currentTarget.value,
                        })
                    }
                />
                <input
                    type="password"
                    placeholder="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={e =>
                        dispatch({
                            type: 'field',
                            fieldName: 'password',
                            payload: e.currentTarget.value,
                        })
                    }
                />
                <button className="submit" type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
        </>
    )
}
