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
            <div className="mdl-grid dark-color">
                <div className="ribbon bright-bg-color">
                    <div className="container">
                        <div className="row m-t-30 m-b-30 text-center">
                            <h1 className="color-white">Aryuvedic Diet Consultation</h1>
                            <hr />

                            {dietConsultations.map(dietConsultation =>
                                <div>
                                    <div className="col-xs-12 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <h3>{dietConsultation.description}</h3>
                                            <h3>Venue: {dietConsultation.venue}</h3>
                                        </div>
                                    </div>
                                    {dietConsultation.consultation_details.map(consultation_details =>
                                        <div className="col-xs-12 col-md-6 m-b-30">
                                            <div className="mdl-card mdl-shadow--4dp p-20">
                                                <h3>{consultation_details.consultation}<br />
                                                    {consultation_details.cost}</h3>
                                                <p>{consultation_details.session_time}</p>
                                                {consultation_details.consultation_specifics.map(consultation_specifics =>
                                                    <ul className="mdl-list">
                                                        <li>
                                                            <p>{consultation_specifics.detail}</p>
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


