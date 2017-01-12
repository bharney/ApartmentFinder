import initialState from './initialState';

export default function dietConsultationReducer(state = initialState.dietConsultations, action) {
    switch (action.type) {
        case 'LOAD_DIET_CONSULTATION_SUCCESS':
            return action.dietConsultations;

        default:
            return state;
    }
}
