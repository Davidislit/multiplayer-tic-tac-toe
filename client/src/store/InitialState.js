const localData = localStorage.getItem('username');

export const initialState = {
    username: localData ? localData : '',
    isLoading: false,
    error: '',
    isLoggedIn: localData ? true : false,
    connectedUsers: [],
    inGame: false,
    opponent: {
        id: '',
        username: '',
    },
    playerTurn: false,
    player: "",
    localData,
};