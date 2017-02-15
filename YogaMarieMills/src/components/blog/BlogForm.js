import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
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


const BlogForm = ({blog, onSave, onChange, loading, errors}) => {
  let loggedIn = false;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-xs-offset-1 col-xs-10">
          <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
            <form>

              <TextInput
                name="title"
                label="Title"
                value={blog.title}
                onChange={onChange}
                error={errors.title} />

              <img width="200" id="image" className="img-circle" src={"../" + blog.image} />


              <div id="editor" className="editor" onClick={this.focus}>
                <p>
                  <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref="editor"
                    plugins={plugins}
                    />
                  <InlineToolbar />
                </p>
              </div>

              <input
                type="submit"
                disabled={loading}
                value={loading ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogForm.propTypes = {
  blog: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default BlogForm;