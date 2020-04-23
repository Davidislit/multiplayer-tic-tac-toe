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
            draft.password = '';
            return;
        }
        case 'logout': {
            draft.isLoggedIn = false;
            return;
        }
        case 'toggleTodoCompleted': {
            const todo = draft.todos.find(item => item.title === action.payload);
            todo.completed = !todo.completed;
            return;
        }
        case 'updateConnectedUsers': {
            draft.connectedUsers = [...action.payload];
            return;
        }
        default:
            break;
    }
    return draft;
}