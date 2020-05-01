export function loginReducer(draft, action) {
    switch (action.type) {
        case 'field': {
            draft[action.fieldName] = action.payload;
            return;
        }
        case 'login': {
            draft.error = '';
            draft.isLoading = true;
            return;
        }
        case 'success': {
            draft.isLoggedIn = true;
            draft.isLoading = false;
            draft.username = action.payload;
            return;
        }
        case 'error': {
            draft.error = 'Incorrect username or password!';
            draft.isLoggedIn = false;
            draft.isLoading = false;
            draft.username = '';
            return;
        }
        case 'logout': {
            localStorage.clear();
            draft.isLoggedIn = false;
            draft.username = '';
            return;
        }
        case 'updateConnectedUsers': {
            const users = action.payload.filter((user) => user.username !== draft.username);
            draft.connectedUsers = [...users];
            return;
        }
        case 'start-game': {
            draft.inGame = true;
            draft.opponent.id = action.payload.opponentId;
            draft.opponent.username = action.payload.opponentName;
            draft.playerTurn = action.payload.playerTurn;
            draft.player = action.payload.player;
            return;
        }
        case 'game-turn': {
            // console.log(`game-turn ${draft.username} ${action.payload}`)
            draft.playerTurn = action.payload;
            return;
        }
        case 'game-leave': {
            draft.inGame = false;
            draft.opponent.id = "";
            draft.opponent.username = "";
            draft.playerTurn = "";
            draft.player = "";
        }
        default:
            break;
    }
    return draft;
}