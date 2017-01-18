import initialState from './initialState';

export default function testimonialReducer(state = initialState.testimonials, action) {
    switch (action.type) {
        case 'LOAD_TESTIMONIAL_SUCCESS':
            return action.testimonials;

        default:
            return state;
    }
}
