import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import Admin from '../common/Admin';
import DatePicker from 'material-ui/DatePicker';
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

const EventTypeForm = ({ updateEventState, onChange, saveEvent, eventType, eventTypeImage, eventTypeImg, editorState, ref, focus, errors, saving, uploadImage, deleteEvent, updateStartDateState, updateEndDateState }) => {


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
                  <Admin saveAction={saveEvent} deleteAction={deleteEvent} uploadImage={uploadImage} />
                  <div className="mdl-card mdl-shadow--4dp">
                    <div className="mdl-card__media image-text-container" style={eventTypeImage}>
                      <img src={eventTypeImg} className="img-responsive hdn" />
                      <div className="col-xs-7 text-left align-bottom m-l-20 m-b-20">
                        <TextInput
                          name="title"
                          label="Title"
                          value={eventType.title}
                          onChange={updateEventState} />
                      </div>
                    </div>
                    <div className="col-xs-12">
                      <div className="col-xs-6 text-left p-l-30">
                        <TextInput
                          name="venue"
                          label="Venue"
                          value={eventType.venue}
                          onChange={updateEventState} />
                        <br />
                        <TextInput
                          name="cost"
                          label="Cost"
                          value={eventType.cost}
                          onChange={updateEventState} />
                      </div>
                      <div className="col-xs-6 text-right p-r-30">
                        <DatePicker
                          formatDate={new Intl.DateTimeFormat('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }).format}
                          floatingLabelText="Start Date"
                          value={eventType.start_date} 
                          name="start_date"
                          onChange={updateStartDateState} />
                        <DatePicker
                          formatDate={new Intl.DateTimeFormat('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }).format}
                          floatingLabelText="End Date"
                          value={eventType.end_date} 
                          name="end_date"
                          onChange={updateEndDateState} />
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
  updateEventState: React.PropTypes.object.isRequired,
  focus: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  uploadImage: React.PropTypes.object.isRequired,
  saveEventType: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default EventTypeForm;