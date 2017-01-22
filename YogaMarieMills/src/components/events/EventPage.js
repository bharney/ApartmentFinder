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
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container">
                        <div className="row m-b-30">
                            <div className="col-xs-12">
                                <h1 className="color-white text-center">{eventType.consultation_header}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp">
                                        <div className="mdl-card__media bg-image-landing v-h-30 p-20">
                                            <header className="color-white">
                                                <h3>{eventType.description}  </h3>
                                                <h4>Venue: {eventType.venue}</h4>
                                            </header>
                                        </div>
                                        {eventType.consultation_details.map(consultation_details =>
                                            <div className="mdl-card__supporting-text dark-color">
                                                <h4>{consultation_details.consultation}<br />
                                                    {consultation_details.cost}</h4>
                                                <p>{consultation_details.session_time}</p>
                                                <p>{consultation_details.details}</p>
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


