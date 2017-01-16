import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';

class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {blog} = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-10">
                        <h2>{blog.name}</h2>
                        <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20 bg-color">
                            <img width="200" className="img-circle" src={blog.image} />
                            <p className="dark-color">{blog.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


BlogPage.propTypes = {
    blog: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}


function getBlogById(blogs, id) {
    const blog = blogs.filter(blog => blog.id == id);
    if (blog.length) {
        return blog[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const blogId = ownProps.params.id;
    let blog = { id: '', name: '', image: '', description: '', href: '', route: '', component: '' };
    if (blogId && state.blogs.length > 0) {
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);





