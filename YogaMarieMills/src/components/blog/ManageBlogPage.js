import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as blogActions from '../../actions/blogActions';
import BlogForm from './BlogForm';


class ManageBlogPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      blog: Object.assign({}, props.blog),
      errors: {},
      saving: false
    };
    this.updateBlogState = this.updateBlogState.bind(this);
    this.saveBlog = this.saveBlog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.blog.id != nextProps.blog.id)
    {
      this.setState({blog: Object.assign({}, nextProps.blog)});
    }
  }

  updateBlogState(event){
    const field = event.target.name;
    let blog = this.state.blog;
    blog[field] = event.target.value;
    return this.setState({blog: blog});
  }

  saveBlog(event){
    event.preventDefault();
    this.props.actions.saveBlog(this.state.blog);
    this.context.router.push('/blogs');
  }

  render() {
    return (
      <BlogForm
        onChange={this.updateBlogState}
        onSave={this.saveBlog}
        blog={this.state.blog}
        errors={this.state.errors}
        saving={this.state.saving}
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

function getBlogById(blogs, id) {
  const blog = blogs.filter(blog => blog.id == id);
  if (blog.length){
    return blog[0];
  }

  return null;
}


function mapStateToProps(state, ownProps) {
  const blogId = ownProps.params.id;
  let blog = {id: '', name: '', image: '', description: '', href: '', route: '', component: ''};
  if(blogId && state.blogs.length > 0){
    blog = getBlogById(state.blogs, blogId);
  }

  return {
    blog: blog
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(blogActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBlogPage);
