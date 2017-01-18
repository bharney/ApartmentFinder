import initialState from './initialState';

export default function MassageReducer(state = initialState.massageTypes, action) {
    switch (action.type) {
        case 'LOAD_MASSAGE_SUCCESS':
            return action.massageTypes;

        default:
            return state;
    }
}
