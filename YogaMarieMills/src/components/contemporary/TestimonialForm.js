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

const TestimonialForm = ({updateTestimonialState, onChange, saveTestimonial, testimonial, testimonialImage, editorState, ref, focus, errors, saving, deleteTestimonial}) => {
    
  return (
    <div className="mdl-grid dark-color">
      <div className="ribbon b-border">
        <div className="container">
          <div className="row m-b-30">
            <div key={testimonial.id} className="col-xs-12">
              <h1 className="color-white text-center">{testimonial.title}</h1>
              <hr />
              <form>
                <Admin saveAction={saveTestimonial} deleteAction={deleteTestimonial} />
                <div className="col-xs-12 m-b-30">
                  <div className="mdl-card mdl-shadow--4dp">
                    <div className="mdl-card__media v-h-40 image-text-container" style={testimonialImage}>
                      <div className="col-xs-7 text-left align-bottom m-l-20 m-b-20">
                          <TextInput
                            name="title"
                            label="Title"
                            value={testimonial.title}
                            onChange={updateTestimonialState} />
                      </div>
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
  );
};

TestimonialForm.propTypes = {
  testimonial: React.PropTypes.object.isRequired,
  editorState: React.PropTypes.object.isRequired,
  updateTestimonialState: React.PropTypes.object.isRequired,
  focus: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  uploadImage: React.PropTypes.object.isRequired,
  saveTestimonial: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default TestimonialForm;