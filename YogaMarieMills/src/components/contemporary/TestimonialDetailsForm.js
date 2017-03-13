import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import RemoveRowButton from '../common/RemoveRowButton';
import Admin from '../common/Admin';

const TestimonialDetailsForm = ({ updateTitleState, updateCostState, removeRow, testimonial, errors, saving }) => {


  return (
    <div>
      {testimonial.testimonial_details.map(testimonial_details =>
        <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
          <ul className="mdl-list">
            <li>
              <TextInput
                className="p-t-0 p-b-0"
                name={testimonial.testimonial_details.findIndex(i => i.id == testimonial_details.id)}
                label="Title"
                placeholder="Title"
                value={testimonial_details.testimonial}
                onChange={updateTitleState} />
              <TextInput
                className="p-t-0 p-b-0"
                name={testimonial.testimonial_details.findIndex(i => i.id == testimonial_details.id)}
                label="Cost"
                placeholder="Cost"
                value={testimonial_details.name}
                onChange={updateCostState} />
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