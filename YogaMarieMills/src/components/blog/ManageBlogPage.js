import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import * as uploadActions from '../../actions/uploadActions';
import BlogForm from './BlogForm';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

class ManageBlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blog: Object.assign({}, props.blog),
      editorState: EditorState.createEmpty(),
      errors: {},
      saving: false
    };
    this.onChange = this.onChange.bind(this);
    this.saveBlog = this.saveBlog.bind(this);
    this.updateBlogState = this.updateBlogState.bind(this);
    this.getTextFromEntity = this.getTextFromEntity.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.focus = this.focus.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
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

  updateBlogState(event) {
    const field = event.target.name;
    let blog = this.state.blog;
    blog[field] = event.target.value;
    return this.setState({ blog: blog });
  }

  saveBlog(event) {
    debugger;
    event.preventDefault();
    let blog = this.state.blog;
    blog.short = this.getTextFromEntity(convertToRaw(this.state.editorState.getCurrentContent()));
    blog.description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({ blog: blog });
    this.props.actions.saveBlog(this.state.blog);
    this.context.router.push('/blogs');
  }

  uploadImage(e) {
    debugger;
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let blog = this.state.blog;
      blog.image = file.name
      this.props.upload.uploadFile(file);
      return this.setState({ blog: blog });
    }
    reader.readAsDataURL(file)
  }

  focus() {
    this.refs.editor.focus();
  }


  render() {
    return (
      <BlogForm
        updateBlogState={this.updateBlogState}
        onChange={this.onChange}
        saveBlog={this.saveBlog}
        blog={this.state.blog}
        editorState={this.state.editorState}
        ref="editor"
        focus={focus}
        errors={this.state.errors}
        saving={this.state.saving}
        uploadImage={this.uploadImage}
        />
    );
  }
}

ManageBlogPage.propTypes = {
  blog: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageBlogPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let blog = { id: '', name: '', image: '', short: '', description: '', href: '', route: '', component: '' };
  return {
    blog: blog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(blogActions, dispatch),
    upload: bindActionCreators(uploadActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBlogPage);
