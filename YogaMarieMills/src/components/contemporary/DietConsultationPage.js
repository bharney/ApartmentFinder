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
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row m-t-30 m-b-30 text-center">
                            <div className="col-xs-offset-1 col-xs-10 m-b-30">
                                <h1 className="color-white">Aryuvedic Diet Consultation</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp p-20">
                                        <h3>{dietConsultations.description}</h3>
                                        <h3>Venue: {dietConsultations.venue}</h3>
                                    </div>
                                    <div className="col-2-masonry">
                                        {dietConsultations.consultationDetails.map(consultationDetails =>
                                            <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
                                                <h3>{consultationDetails.title}<br />
                                                    {consultationDetails.cost}</h3>
                                                <p>{consultationDetails.session_time}</p>
                                                <p>{consultationDetails.consultation}</p>
                                                <p>{consultationDetails.consultation_desc}</p>
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


