import initialState from './initialState';

export default function authTokenReducer(state = initialState.authToken, action) {
    switch (action.type) {
        case 'IS_AUTHENTICATED':
            return {
                user: action.user,
                token: action.token,
            }

        case 'NOT_AUTHENTICATED':
            return {
                user: null,
                token: null,
            }

        default:
            return state;
    }
}