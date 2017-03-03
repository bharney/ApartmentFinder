import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../actions/eventActions';
import * as uploadActions from '../../actions/uploadActions';
import EventForm from './EventForm';
import Admin from '../common/Admin';
import TextInput from '../common/TextInput';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

class ManageEventPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
    ]);

    let blocks = convertFromRaw(blocks = { blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } });
    if (props.event.description != "")
      blocks = convertFromRaw(JSON.parse(props.event.description));

    this.state = {
      event: Object.assign({}, props.event),
      editorState: EditorState.createWithContent(
        blocks,
        decorator,
      ),
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.getTextFromEntity = this.getTextFromEntity.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.event.id != nextProps.event.id) {
      this.setState({ event: Object.assign({}, nextProps.event) });
      const blocks = convertFromRaw(JSON.parse(nextProps.event.description));
      const editorState = EditorState.push(this.state.editorState, blocks);
      this.setState({ editorState });
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  focus() {
    this.refs.editor.focus();
  }

  getTextFromEntity(editorObj) {
    let descriptionBlocks = [];
    for (let prop in editorObj.blocks) {
      if (editorObj.blocks.hasOwnProperty(prop)) {
        descriptionBlocks.push(editorObj.blocks[prop].text)
      }
    }
    return descriptionBlocks.join("\\n ");
  }

  updateEventState(event) {
    const field = event.target.name;
    let event = this.state.event;
    event[field] = event.target.value;
    return this.setState({ event });
  }

  saveEvent(event) {
    event.preventDefault();
    let event = this.state.event;
    event.short = this.getTextFromEntity(convertToRaw(this.state.editorState.getCurrentContent()));
    event.description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({ event });
    this.props.actions.saveEvent(this.state.event);
    this.context.router.push('/YogaThurles/Events');
  }

  deleteEvent(event) {
    this.props.actions.deleteEvent(this.state.event.id);
    this.props.actions.loadEvent();
    this.context.router.push('/YogaThurles/Events');
  }

  uploadImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let event = this.state.event;
      event.image = file.name
      this.props.upload.uploadFile(file);
      return this.setState({ event: event });
    }
    reader.readAsDataURL(file)
  }

  render() {
    const {event} = this.props;
    
    let eventImg = event.image != "" ? require(`../../images/${event.image}`) : ""

    const eventImage = {
      backgroundImage: 'url(' + eventImg + ')',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }

    return (
      <EventForm
        updateEventState={this.updateEventState}
        onChange={this.onChange}
        saveEvent={this.saveEvent}
        event={this.state.event}
        eventImage={eventImage}
        editorState={this.state.editorState}
        ref="editor"
        focus={focus}
        errors={this.state.errors}
        saving={this.state.saving}
        uploadImage={this.uploadImage}
        deleteEvent={this.deleteEvent}
        />
    );
  }
}

ManageEventPage.propTypes = {
  event: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  editorState: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  upload: PropTypes.object.isRequired,
  entityKey: PropTypes.object.isRequired,
};

ManageEventPage.contextTypes = {
  router: PropTypes.object
};

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


function getEventById(events, id) {
  const event = events.filter(event => event.id == id);
  if (event.length) {
    return event[0];
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  const eventId = ownProps.params.id;
  let event = { id: '', title: '', image: '', short: '', description: '', href: '', route: '', component: '' };
  if (eventId && state.events.length > 0) {
    event = getEventById(state.events, eventId);
  }

  return {
    event: event
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(eventActions, dispatch),
    upload: bindActionCreators(uploadActions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageEventPage);
