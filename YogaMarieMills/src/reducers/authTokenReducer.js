import initialState from './initialState';

export default function authTokenReducer(state = initialState.authToken, action) {
    switch (action.type) {
        case 'IS_AUTHENTICATED':
            return {
                authToken: action.token,
            }

        case 'NOT_AUTHENTICATED':
            return {
                authToken: null,
            }

        default:
            return state;
    }
}