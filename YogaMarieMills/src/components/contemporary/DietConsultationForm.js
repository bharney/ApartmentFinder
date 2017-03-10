import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import TextInput from '../common/TextInput';
import TextAreaInput from '../common/TextAreaInput';
import RemoveRowButton from '../common/RemoveRowButton';
import Admin from '../common/Admin';
import ConsultationDetailsForm from './ConsultationDetailsForm';
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

const DietConsultationForm = ({ updateDescriptionState, updateTitleState, updateDietConsultationState, removeRow, saveDietConsultation, dietConsultation, errors, saving, deleteDietConsultation, onChange, editorState, ref, focus }) => {

  return (
    <form>
      <div className="mdl-grid dark-color">
        <div className="ribbon bg-image-landing">
          <div className="container-fluid">
            <div className="row m-t-30 m-b-30 text-center">
              <div className="col-xs-12 col-sm-offset-1 col-sm-10 m-b-30">
                <h1 className="color-white">Aryuvedic Diet Consultation</h1>
                <h3 className="color-white">{dietConsultation.short}</h3>
                <div className="mdl-card mdl-shadow--4dp p-2-em">
                  <h3>Venue: {dietConsultation.venue}</h3>
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
                  <ConsultationDetailsForm updateDescriptionState={updateDescriptionState}
                    updateTitleState={updateTitleState}
                    updateDietConsultationState={updateDietConsultationState}
                    removeRow={removeRow}
                    saveDietConsultation={saveDietConsultation}
                    dietConsultation={dietConsultation}
                    errors={errors}
                    saving={saving}
                    deleteDietConsultationdietConsultation={dietConsultation} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

DietConsultationForm.propTypes = {
  dietConsultation: React.PropTypes.object.isRequired,
  updateDietConsultationState: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  saveDietConsultation: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default DietConsultationForm;