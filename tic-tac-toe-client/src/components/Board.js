import React, { useEffect, useState, useContext } from 'react';
import { DispatchContext, StateContext } from '../context/StateContext';
import { SocketContext } from '../context/SocketContext';

const Board = (props) => {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext);
    const socket = useContext(SocketContext); 

    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const { username, opponent, playerTurn, player } = state;

    useEffect(() => {
        socket.emit('game-match-begin', { })
    }, []);

    const handleClick = (index) => {
        const squares = [...boardSquares];

        if (winner || squares[index]) return;

        squares[index] = xIsNext ? "X" : "O";
        setBoardSquares(squares);

        socket.emit('game-board-turn');

        // setXIsNext(!xIsNext);
    };

    const renderSquare = (index) => {
        return (
            <Square value={boardSquares[index]} onClick={() => handleClick(index)} />
        );
    };

    const calculateWinner = (squares) => {
        const winningLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (
                squares[a] &&
                squares[a] === squares[b] &&
                squares[b] === squares[c]
            ) {
                return squares[a];
            }
        }

        return null;
    };

    const resetGame = () => {
        setBoardSquares(Array(9).fill(null));
        setXIsNext(true);
    }

    const handleLeaveGame = () => { 
        console.log('LEAVE GAME');
    }

    let status;
    const winner = calculateWinner(boardSquares);
    status = winner
        ? `Winner is ${winner}`
        : `Next player: ${xIsNext ? "X" : "O"}`;

    return (
        <div className="flex items-center justify-center h-screen bg-blue-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label className="block text-gray-700 text-2xl font-bold mb-2">{username} Against The {opponent.username}!</label>
                <div className="block text-gray-500 text-lg mb-2">You Play: {player}</div>
                <div className="block text-gray-500 text-lg mb-2">Turn: {playerTurn ? "You" : "Opponent"}</div>
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
                    <button className={`${winner ? '' : 'opacity-75 cursor-not-allowed'} bg-green-500 hover:bg-blue-700 text-white font-bold mt-5 py-2 px-4 rounded focus:outline-none focus:shadow-outline`} onClick={winner ? resetGame : null}>Reset Game</button>
                </div>

            </div>

        </div>
    );
};

const Square = (props) => {

    return (
        <>
            <button className={`${props.value === null ? 'bg-blue-200' : props.value === 'X' ? 'bg-red-300' : 'bg-green-300'} h-12 w-12 sm:h-16 sm:w-16 md:h-32 md:w-32 text-white text-6xl border-blue-200 hover:opacity-50 rounded-lg border-2 float-left text-lg font-bold leading-relaxed  mr-1 mt-1 p-0 text-center  focus:outline-none`} onClick={props.onClick}>{props.value}</button>
        </>
    );
}

export default Board;