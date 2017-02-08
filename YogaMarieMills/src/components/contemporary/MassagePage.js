import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as massageActions from '../../actions/massageActions';

class MassagePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {massageType} = this.props;
// ,M.type AS type
//                 ,H.header AS header
//                 ,H.short AS short
//                 ,H.description AS description 
//                 ,H.venue AS venue
//                 ,M.session_time AS session_time
//                 ,M.title AS title
//                 ,M.description AS description
//                 ,M.cost AS cost
        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid m-t-30 m-b-30">
                        <div className="row m-b-30">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h1 className="text-center color-white">{massageType.header}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp p-20 text-center">
                                        <h3>{massageType.description}</h3>
                                        <h3>Venue: {massageType.venue}</h3>
                                    </div>
                                </div>
                                {massageType.consultation_details.map(consultation_details =>
                                    <div className="col-xs-12 col-md-6 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <div className="icon-circle aroma-oil bg-color-green mdl-shadow--4dp"></div>
                                            <h4 className="text-center">{consultation_details.consultation}<br />
                                                {consultation_details.cost}</h4>
                                            <p className="text-center">{consultation_details.session_time}</p>
                                            <p>{consultation_details.details}</p>
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

MassagePage.propTypes = {
    massageTypes: PropTypes.array.isRequired,
    massageType: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function getMassageByType(massageTypes, type) {
    const massageType = massageTypes.filter(massageType => massageType.type == type);
    if (massageType.length) {
        return massageType[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const massageTypeId = ownProps.params.id;
    let massageType = { id: '', type: '', consultation_header: '', description: '', route: '', venue: '', consultation_details: [{ id: '', session_time: '', consultation: '', details: '', cost: '', consultation_specifics: [{ id: '', detail: '' }] }] };
    if (massageTypeId && state.massageTypes.length > 0) {
        massageType = getMassageByType(state.massageTypes, massageTypeId);
    }

    return {
        massageType: massageType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(massageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MassagePage);


