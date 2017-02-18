import React from 'react';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
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

const BlogForm = ({updateBlogState, onChange, saveBlog, blog, editorState, focus, errors, saving, uploadImage}) => {

  return (
    <div className="mdl-grid dark-color">
      <div className="ribbon bg-image-landing b-border">
        <div className="container">
          <div className="row m-b-30">
            <div className="col-xs-12">
              <h1 className="color-white text-center">{blog.title}</h1>
              <hr />
              <form>
                <Admin uploadImage={uploadImage} blog={blog} saveBlog={saveBlog} />
                <div className="col-xs-12 m-b-30">
                  <div className="mdl-card mdl-shadow--4dp">
                    <div className="mdl-card__media v-h-40 image-text-container">
                      <div className="col-xs-7 text-left align-bottom m-l-20 m-b-20">
                        <TextInput
                          name="title"
                          label="Title"
                          value={blog.title}
                          onChange={updateBlogState}
                          error={errors.title} />
                      </div>
                    </div>
                    <div className="col-xs-12 t-border-thin p-20">
                      <div id="editor" className="editor" onClick={focus}>
                        <p>
                          <Editor
                            editorState={editorState}
                            onChange={onChange}
                            ref="editor"
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

BlogForm.propTypes = {
  blog: React.PropTypes.object.isRequired,
  editorState: React.PropTypes.object.isRequired,
  updateBlogState: React.PropTypes.object.isRequired,
  focus: React.PropTypes.object.isRequired,
  saving: React.PropTypes.object.isRequired,
  uploadImage: React.PropTypes.object.isRequired,
  saveBlog: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default BlogForm;