import initialState from './initialState';

export default function bodyMassageReducer(state = initialState.bodyMassageTypes, action) {
    switch (action.type) {
        case 'LOAD_BODY_MASSAGE_SUCCESS':
            return action.bodyMassageTypes;

        default:
            return state;
    }
}
