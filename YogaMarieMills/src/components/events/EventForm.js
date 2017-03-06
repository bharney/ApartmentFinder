import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import Admin from '../common/Admin';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
  ]
});

const plugins = [inlineToolbarPlugin];

const { InlineToolbar } = inlineToolbarPlugin;

const EventTypeForm = ({ updateEventTypeState, onChange, saveEventType, eventType, eventTypeImage, eventTypeImg, editorState, ref, focus, errors, saving, uploadImage, deleteEventType }) => {


  return (
    <div className="mdl-grid dark-color">
      <div className="ribbon bg-image-landing b-border">
        <div className="container">
          <div className="row m-b-30">
            <div className="col-xs-12">
              <h1 className="color-white text-center">{eventType.header}</h1>
              <hr />
              <div className="col-xs-12 m-b-30">
                <form>
                  <Admin saveAction={saveEventType} deleteAction={deleteEventType} uploadImage={uploadImage} />
                  <div className="mdl-card mdl-shadow--4dp">
                    <div className="mdl-card__media image-text-container" style={eventTypeImage}>
                      <img src={eventTypeImg} className="img-responsive hdn"/>
                      <div className="col-xs-7 text-left align-bottom m-l-20 m-b-20">
                        <TextInput
                          name="title"
                          label="Title"
                          value={eventType.title}
                          onChange={updateEventTypeState} />
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
                        <div id="editor" className="editor" onClick={focus}>
                          <p>
                            <Editor
                              editorState={editorState}
                              onChange={onChange}
                              ref={ref}
                              plugins={plugins}
                            />
                            <InlineToolbar />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventTypeForm.propTypes = {
  eventType: React.PropTypes.object.isRequired,
  editorState: React.PropTypes.object.isRequired,
  updateEventTypeState: React.PropTypes.object.isRequired,
  focus: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  uploadImage: React.PropTypes.object.isRequired,
  saveEventType: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default EventTypeForm;