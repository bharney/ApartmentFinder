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
                    <div id="about" div className="mdl-card container m-t-30 m-b-30 mdl-shadow--4dp">
                        <div className="featured clearfix text-center">
                            <div className="row m-b-30">
                                <div className="col-xs-offset-1 col-xs-10">
                                    {bodyMassageTypes.map(bodyMassageType =>
                                        <div className="row m-t-30">
                                            <div className="col-xs-12">
                                                <Link to="">
                                                    <div className="icon-circle aroma-oil bg-color-green"></div>
                                                </Link>
                                                <h1 className="text-center">{bodyMassageType.consultation_header}</h1>
                                                <h2 className="text-center">{bodyMassageType.description}</h2>
                                                <h3>Venue: {bodyMassageType.venue}</h3>
                                                <div className="row">
                                                    {bodyMassageType.consultation_details.map(consultation_details =>
                                                        <div className="col-xs-6">

                                                            <h3>{consultation_details.consultation} - {consultation_details.cost}</h3>
                                                            <h4>{consultation_details.session_time}</h4>
                                                            <p>{consultation_details.details}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
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


