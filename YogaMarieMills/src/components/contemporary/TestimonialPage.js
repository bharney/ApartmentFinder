import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testimonialActions from '../../actions/testimonialActions';


class TestimonialPage extends React.Component {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        const {testimonials} = this.props;

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                            <div className="row m-t-30 m-b-30 text-center">
                                <div className="col-xs-offset-1 col-xs-10 m-b-30">
                                    <h1 className="color-white">{testimonials.header}</h1>
                                    <hr />
                                    <div className="col-xs-12 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <h3>{testimonials.description}</h3>
                                        </div>

                                        <div className="col-2-masonry">
                                            {testimonials.testimonial_details.map(testimonial_details =>
                                                <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
                                                    <ul className="mdl-list">
                                                        <li>
                                                            <blockquote>{testimonial_details.testimonial}</blockquote>
                                                            <p>{testimonial_details.name}</p>
                                                        </li>
                                                    </ul>
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

TestimonialPage.propTypes = {
    testimonials: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        testimonials: state.testimonials
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testimonialActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestimonialPage);