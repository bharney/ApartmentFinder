import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dietConsultationActions from '../../actions/dietConsultationActions';

class DietConsultationPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {dietConsultations} = this.props;

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div id="about" div className="mdl-card container m-t-30 m-b-30 mdl-shadow--4dp">
                        <div className="featured clearfix text-center">
                            <div className="row m-b-30">
                                <div className="col-xs-offset-1 col-xs-10">
                                    <h1>Aryuvedic Diet Consultation</h1>
                                    <hr />
                                    {dietConsultations.map(dietConsultation =>
                                        <div>
                                            <h3>{dietConsultation.description}</h3>
                                            <h3>Venue: {dietConsultation.venue}</h3>
                                            {dietConsultation.consultation_details.map(consultation_details =>
                                                <div className="row text-left">
                                                    <div className="col-xs-12">
                                                        <h3>{consultation_details.consultation} - {consultation_details.cost}</h3>
                                                        <h4>{consultation_details.session_time}</h4>
                                                        {consultation_details.consultation_specifics.map(consultation_specifics =>
                                                            <ul>
                                                                <li>
                                                                    {consultation_specifics.detail}
                                                                </li>
                                                            </ul>
                                                        )}
                                                        <p>{consultation_details.details}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DietConsultationPage.propTypes = {
    dietConsultations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        dietConsultations: state.dietConsultations
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dietConsultationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DietConsultationPage);


