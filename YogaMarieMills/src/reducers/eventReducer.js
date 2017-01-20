import initialState from './initialState';

export default function EventReducer(state = initialState.eventTypes, action) {
    switch (action.type) {
        case 'LOAD_EVENT_SUCCESS':
            return action.eventTypes;

        default:
            return state;
    }
}
