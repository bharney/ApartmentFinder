import React, {PropTypes} from 'react';
import { Link } from 'react-router';


const Blog = ({blog}) => {
    return (
        <div className="col-xs-4">
            <Link key={blog.route} to={'/' + blog.route} activeClassName="active" className="col-xs-offset-3">
                <img width="200" className="img-circle" src={blog.image} />
            </Link>
            <div>{blog.description}</div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.array.isRequired
};

export default Blog;