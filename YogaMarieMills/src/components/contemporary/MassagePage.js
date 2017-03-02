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

        let displayIcon = function (icon, iconWidth, iconHeight) {
            let requireImg = icon ? require(`../../images/${icon}`) : ""
            const iconImg = {
                backgroundImage: 'url(' + requireImg + ')',
                backgroundSize: `${iconWidth} ${iconHeight}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }
            return (<div className="icon-circle-sm bg-color-green mdl-shadow--4dp" style={iconImg}></div>)
        }
        let offset = false;
        let offsetColumns = function (massage_details) {
            if (offset) {
                offset = false;
                return (
                    <div className="row">
                        <div className="col-xs-12 col-sm-offset-1 col-sm-4">
                            <h4><strong>{massage_details.title}</strong></h4>
                            <p>{massage_details.description}</p>
                        </div>
                    </div>
                )
            }
            else {
                offset = true;
                return (
                    <div className="col-xs-12 col-sm-offset-2 col-sm-4">
                        <h4><strong>{massage_details.title}</strong></h4>
                        <p>{massage_details.description}</p>
                    </div>
                )
            }

        }

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
                                {massageType.massages.map(massage =>
                                    <div className="col-xs-12 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-t-1-em p-b-3-em">
                                            <div className="row p-t-1-em">
                                                <div className="col-xs-12 p-t-1-em">
                                                    {displayIcon(massage.icon, massage.iconWidth, massage.iconHeight)}
                                                    <h3 className="text-center"><strong>{massage.title}</strong></h3>
                                                    <hr width="50%" className="center-block" />
                                                    <p className="text-center">{massage.cost}</p>
                                                </div>
                                            </div>
                                            <p className="text-center">{massage.session_time}</p>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                                                    {massage.massage_details.map(massage_details =>
                                                        offsetColumns(massage_details)
                                                    )}
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
    let massageType = { type: '', header: '', description: '', venue: '', massages: [{ session_time: '', title: '', details: '', cost: '', massage_details: [{ title: '', description: '' }] }] };
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


