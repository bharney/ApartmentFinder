import initialState from './initialState';

export default function authTokenReducer(state = initialState.authToken, action) {
    switch (action.type) {
        
        case 'IS_AUTHENTICATED':
        debugger;
            return {
                authToken: action.authToken,
            }

        case 'NOT_AUTHENTICATED':
        debugger;
            return {
                authToken: null,
            }

        default:
            return state;
    }
}