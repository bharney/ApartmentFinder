import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as bodyMassageActions from '../../actions/bodyMassageActions';

class BodyMassagePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {bodyMassageTypes} = this.props;

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div className="container m-t-30 m-b-30">
                        <div className="row m-b-30">

                            {bodyMassageTypes.map(bodyMassageType =>

                                <div className="col-xs-12">
                                    <h1 className="text-center color-white">{bodyMassageType.consultation_header}</h1>
                                    <hr />
                                    <div className="col-xs-12 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20 text-center">
                                            <h3>{bodyMassageType.description}</h3>
                                            <h3>Venue: {bodyMassageType.venue}</h3>
                                        </div>
                                    </div>
                                    {bodyMassageType.consultation_details.map(consultation_details =>
                                        <div className="col-xs-12 col-md-6 m-b-30">
                                            <div className="mdl-card mdl-shadow--4dp p-20">
                                                <div className="icon-circle aroma-oil bg-color-green"></div>
                                                <h4 className="text-center">{consultation_details.consultation}<br />
                                                    {consultation_details.cost}</h4>
                                                <p className="text-center">{consultation_details.session_time}</p>
                                                <p>{consultation_details.details}</p>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BodyMassagePage.propTypes = {
    bodyMassageTypes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        bodyMassageTypes: state.bodyMassageTypes
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(bodyMassageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BodyMassagePage);


