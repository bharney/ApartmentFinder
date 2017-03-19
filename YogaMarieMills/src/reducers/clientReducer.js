import initialState from './initialState';

export default function clientReducer(state = initialState.client, action) {
    switch (action.type) {
        case 'CLIENT_SET':
            return {
                id: action.token.userId,
                token: action.token,
            }

        case 'CLIENT_UNSET':
            return {
                id: null,
                token: null,
            }

        default:
            return state;
    }
}