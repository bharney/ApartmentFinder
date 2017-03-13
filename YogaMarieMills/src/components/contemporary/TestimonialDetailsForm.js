import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import RemoveRowButton from '../common/RemoveRowButton';
import Admin from '../common/Admin';

const TestimonialDetailsForm = ({ updateQuoteState, updateNameState, removeRow, testimonial, errors, saving }) => {


  return (
    <div>
      {testimonial.testimonial_details.map(testimonial_details =>
        <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
          <ul className="mdl-list">
            <li>
              <TextAreaInput
                className="p-t-0 p-b-0"
                name={testimonial.testimonial_details.findIndex(i => i.id == testimonial_details.id)}
                label="Testimonial"
                placeholder="Testimonial"
                rows="5"
                value={testimonial_details.testimonial}
                onChange={updateQuoteState} />
              <TextInput
                className="p-t-0 p-b-0"
                name={testimonial.testimonial_details.findIndex(i => i.id == testimonial_details.id)}
                label="Name"
                placeholder="Name"
                value={testimonial_details.name}
                onChange={updateNameState} />
            </li>
          </ul>
          <RemoveRowButton
            name={testimonial.testimonial_details.findIndex(i => i.id == testimonial_details.id)}
            onClick={removeRow} />
        </div>
      )}
    </div>
  );
};

TestimonialDetailsForm.propTypes = {
  testimonial: React.PropTypes.object.isRequired,
  updateTestimonialState: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  saveTestimonial: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default TestimonialDetailsForm;