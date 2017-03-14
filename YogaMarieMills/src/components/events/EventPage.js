import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import landing from '../../images/landing.jpg';

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
                        <div className="row m-b-1-em">
                            <div className="col-xs-12">
                                <h1 className="color-white text-center">{eventType.header}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-1-em">
                                    <div className="mdl-card mdl-shadow--4dp">
                                        <div className="mdl-card__media bg-image-landing v-h-40 image-text-container">
                                            <div className="text-left align-bottom m-l-20 m-b-20">
                                                <header className="color-white">
                                                    <h4 className="m-t-0 m-b-0"><strong>{eventType.title}</strong></h4>
                                                </header>
                                            </div>
                                        </div>
                                        <div className="col-xs-12">
                                            <div className="col-xs-6 text-left p-l-30">
                                                <h4><strong>Venue: {eventType.venue}<br />
                                                    {eventType.session_time}</strong></h4>
                                            </div>
                                            <div className="col-xs-6 text-right p-r-30">
                                                <h4><strong>{eventType.cost}</strong></h4>
                                            </div>
                                            <div className="col-xs-12 t-border-thin p-20">
                                                <p>{eventType.description}</p>
                                            </div>
                                        </div>
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
    let eventType = { id: '', type: '', header: '', description: '', route: '', venue: '', eventDetails: [{ id: '', session_time: '', title: '', description: '', cost: '' }] };
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


