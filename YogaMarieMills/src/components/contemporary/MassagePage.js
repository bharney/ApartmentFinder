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
        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing">
                    <div className="container m-t-30 m-b-30">
                        <div className="row m-b-30">
                            <div className="col-xs-12">
                                <h1 className="text-center color-white">{massageType.header}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp p-20 text-center">
                                        <h3>{massageType.description}</h3>
                                        <h3>Venue: {massageType.venue}</h3>
                                    </div>
                                </div>
                                {massageType.massage_details.map(massage_details =>
                                    <div className="col-xs-12 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <div className="icon-circle aroma-oil bg-color-green mdl-shadow--4dp"></div>
                                                    <h3 className="text-center"><strong>{massage_details.title}</strong></h3>
                                                    <hr width="50%" className="center-block" />
                                                    <p className="text-center">{massage_details.cost}</p>
                                                </div>
                                            </div>
                                            <p className="text-center">{massage_details.session_time}</p>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                                                    <h4><strong>DETOX</strong></h4>
                                                    <p>Stimulates lymphatic system to release toxins with an artful blend of lemon, grapefruit and juniper.</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                                                    <h4><strong>RELAX</strong></h4>
                                                    <p>Lavender blend reduces inflammation and promotes tranquility.</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                                                    <h4><strong>INVIGORATE</strong></h4>
                                                    <p>Enlivens the body and mind and increases circulation with mix of rosemary, mint and patchouli.</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                                                    <h4><strong>SOOTHE</strong></h4>
                                                    <p>Rosemary, clove and sweet birch combine to alleviate the aches and pains of sore muscles.</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                                                    <h4><strong>RECHARGE</strong></h4>
                                                    <p>Energizing citrus blend to awaken the senses.</p>
                                                </div>
                                                <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                                                    <h4><strong>UNWIND</strong></h4>
                                                    <p>Blends of orange, bergamot, sage and lemon release anxiety, stress and apprehension.</p>
                                                </div>
                                            </div>
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
    let massageType = { type: '', header: '', description: '', venue: '', massage_details: [{ session_time: '', title: '', details: '', cost: '' }] };
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


