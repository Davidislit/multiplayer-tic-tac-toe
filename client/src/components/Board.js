import React, { useEffect, useState, useContext } from 'react';
import { DispatchContext, StateContext } from '../context/StateContext';
import { SocketContext } from '../context/SocketContext';
import Fireworks from "fireworks/lib/react";
import {ToastsStore} from "react-toasts";

const Board = (props) => {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext); 

    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
    const [winner, setWinner] = useState("");

    const { username, opponent, playerTurn, player } = state;

    useEffect(() => {
        socket.on('game-board', ({ playerTurn, squares }) => {
            dispatch({ type: 'game-turn', payload: playerTurn });
            setBoardSquares(squares);
        });

        socket.on('game-reset', ({ playerTurn }) => {
            setBoardSquares(Array(9).fill(null));
            setWinner('');
            dispatch({ type: 'game-turn', payload: playerTurn });
        })

        socket.on('game-winner', ({winner}) => {
            setWinner(winner);
        });

        socket.on('game-leave', ({ leavedGame }) => {
            if (leavedGame) {
                ToastsStore.error(`${opponent.username} left the game.`);
            }
            dispatch({ type: 'game-leave' })
        })
    }, []);

    const handleClick = (index) => {
        const squares = [...boardSquares];

        if (squares[index]) return;

        if (playerTurn) {
            squares[index] = player;
            socket.emit('game-board-turn', squares);
        }
        setBoardSquares(squares);
    };

    const renderSquare = (index) => {
        return (
            <Square winner={winner} value={boardSquares[index]} index={index} onClick={handleClick} />
        );
    };

    const resetGame = () => {
        setBoardSquares(Array(9).fill(null));
        socket.emit('game-reset');
    }

    const handleLeaveGame = () => { 
        socket.emit('game-leave');
    }

    const renderWinner = () => {
        switch (true) {
            case winner === 'draw':
                return ( <div className="block text-gray-500 text-2xl mb-2">Draw</div>);
            case winner === player:
                return (
                    <>
                        <Fireworks {...fxProps}/>
                        <div className="block text-gray-500 text-2xl mb-2">You Won!</div>
                    </>
                );
            case winner === opponent.player:
                    return (
                        <div className="block text-gray-500 text-2xl mb-2">You Lost :(</div>
                    );
            default:
                return (
                    <>
                        <div className="block text-gray-500 text-lg mb-2">You Play: {player}</div>
                        <div className="block text-gray-500 text-lg mb-2">Turn: {playerTurn ? "You" : "Opponent"}</div>
                    </>
                );

        }
    }

    let fxProps = {
        count: 3,
        interval: 600,
        colors: ['#cc3333', '#FCD12A', '#0080FE'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 50,
            y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-2">{username} Against The {opponent.username}!</label>
                {renderWinner()}
                <div className="flex flex-col md:flex-shrink-0">
                    <div className="flex justify-center">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="flex justify-center">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="flex justify-center">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                </div>
                <div className="flex justify-between">
                    <button className={'bg-red-500 hover:bg-red-300 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline'} onClick={handleLeaveGame}>Leave Game</button>
                    <button disabled={winner === ''} className={`${winner ? '' : 'opacity-25 cursor-not-allowed'} bg-green-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline`} onClick={resetGame}>Reset Game</button>
                </div>

            </div>

        </div>
    );
};

const Square = (props) => {

    return (
        <>
            <button disabled={props.winner} className={`${props.value === null ? 'bg-blue-200' : props.value === 'X' ? 'bg-red-300' : 'bg-green-300'} h-12 w-12 sm:h-16 sm:w-16 md:h-32 md:w-32 text-4xl md:text-6xl text-white leading-none border-blue-200 hover:opacity-50 rounded-lg border-2 float-left font-bold mr-1 mt-1 p-0 text-center focus:outline-none`} onClick={() => props.onClick(props.index)}>{props.value}</button>
        </>
    );
}

export default Board;