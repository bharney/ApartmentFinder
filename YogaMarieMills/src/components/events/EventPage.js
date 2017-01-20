import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';

class EventPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {eventType} = this.props;

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div className="container-fluid m-t-30 m-b-30">
                        <div className="row m-b-30">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h1 className="text-center color-white">{eventType.consultation_header}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp p-20 text-center">
                                        <h3>{eventType.description}</h3>
                                        <h3>Venue: {eventType.venue}</h3>
                                    </div>
                                </div>
                                {eventType.consultation_details.map(consultation_details =>
                                    <div className="col-xs-12 col-md-6 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <div className="icon-circle aroma-oil bg-color-green"></div>
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

EventPage.propTypes = {
    eventTypes: PropTypes.array.isRequired,
    eventType: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function getEventByType(eventTypes, type) {
    const eventType = eventTypes.filter(eventType => eventType.type == type);
    if (eventType.length) {
        return eventType[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const eventTypeId = ownProps.params.id;
    let eventType = { id: '', type: '', consultation_header: '', description: '', route: '', venue: '', consultation_details: [{ id: '', session_time: '', consultation: '', details: '', cost: '', consultation_specifics: [{ id: '', detail: '' }] }] };
    if (eventTypeId && state.eventTypes.length > 0) {
        eventType = getEventByType(state.eventTypes, eventTypeId);
    }

    return {
        eventType: eventType
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);


