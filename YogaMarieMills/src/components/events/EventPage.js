import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Admin from '../common/Admin';
import * as eventActions from '../../actions/eventActions';
import { CompositeDecorator, ContentBlock, ContentState, Editor, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';


class EventPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        const decorator = new CompositeDecorator([
            {
                strategy: getEntityStrategy('MUTABLE'),
                component: TokenSpan,
            },
        ]);
    }

    render() {
        const { eventType } = this.props;
        const {authorized} = this.props;
        function displayImage(image) {
            image = image ? require(`../../images/${image}`) : '';
            return ({
                backgroundImage: 'url(' + image + ')',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain"
            })
        }

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container">
                        <div className="row m-b-1-em">
                            <div className="col-xs-12">
                                <h1 className="color-white text-center">{eventType.header}</h1>
                                <Admin addAction={"Admin/Events"} authorized={authorized}/>
                                <div className="col-xs-12 m-b-1-em">
                                    <div className="mdl-card mdl-shadow--4dp">
                                        <Admin editAction={"Admin/Events/" + eventType.type} authorized={authorized}/>
                                        <div className="mdl-card__media image-text-container" style={displayImage(eventType.image)}>
                                            <img src={"../" + eventType.image} className="img-responsive hdn" />
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
                                                <div id="editor" className="editor">
                                                    <p>
                                                        <Editor
                                                            editorState={EditorState.createWithContent(
                                                                eventType.description ? convertFromRaw(JSON.parse(eventType.description))
                                                                    : convertFromRaw({ blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } }),
                                                                this.decorator,
                                                            )}
                                                            readOnly={true}
                                                            ref="editor"
                                                        />
                                                    </p>
                                                </div>
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


function getEntityStrategy(mutability) {
    return function (contentBlock, callback, contentState) {
        contentBlock.findEntityRanges(
            (character) => {
                const entityKey = character.getEntity();
                if (entityKey === null) {
                    return false;
                }
                return contentState.getEntity(entityKey).getMutability() === mutability;
            },
            callback
        );
    };
}

function getDecoratedStyle(mutability) {
    switch (mutability) {
        case 'MUTABLE': return null;
        default: return null;
    }
}

const TokenSpan = (props) => {
    const style = getDecoratedStyle(
        props.contentState.getEntity(props.entityKey).getMutability()
    );
    return (
        <span data-offset-key={props.offsetkey}>
            {props.children}
        </span>
    );
};

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
        eventType: eventType,
        authorized: state.authToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(eventActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage);