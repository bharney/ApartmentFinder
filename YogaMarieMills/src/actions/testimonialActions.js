import testimonialApi from '../API/mockTestimonialApi';

export function loadTestimonialSuccess(testimonials) {
    return { type: 'LOAD_TESTIMONIAL_SUCCESS', testimonials};
}

export function loadTestimonial() {
    return function (dispatch) {
        return testimonialApi.getAllItems().then(testimonials => {
            dispatch(loadTestimonialSuccess(testimonials));
    }).catch(error => {
      throw(error);
    });
  };
}
