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
                <div className="ribbon bright-bg-color">
                    <div className="container-fluid">
                        <div className="row m-t-30 m-b-30 text-center">
                            <div className="col-xs-offset-1 col-xs-10 m-b-30">
                                {testimonials.map(testimonial =>
                                    <div>
                                        <h1 className="color-white">{testimonial.header}</h1>
                                        <hr />


                                        <div className="col-xs-12 m-b-30">
                                            <div className="mdl-card mdl-shadow--4dp p-20">
                                                <h3>{testimonial.description}</h3>
                                                <p>{testimonial.details}</p>
                                            </div>
                                        </div>
                                        <div className="row text-center masonry">
                                            {testimonial.quotes.map(quotes =>
                                                    <div className="mdl-card mdl-shadow--4dp p-20 tile-masonry bg-color-white">
                                                        <ul className="mdl-list">
                                                            <li>
                                                                <blockquote>{quotes.detail}</blockquote>
                                                                <p>{quotes.name}</p>
                                                            </li>
                                                        </ul>
                                                    </div>

                                            )}
                                        </div>
                                    </div>
                                )}
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