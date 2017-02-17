import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import MultilineText from '../common/MultilineText';

const Blog = ({blog}) => {

    let previewText = function (short) {
        return short.substring(0, 500) + "...";
    };

    return (
        <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
            <div className="mdl-card__title">
                <div className="mdl-card__title-text">
                    <section className="text-center">
                        <h2>{blog.title}</h2>
                    </section>
                </div>
            </div>
            <div className="mdl-card__media bright-bg-color">
                <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                    <img width="200" className="img-circle" src={blog.image} />
                </div>
            </div>
            <div className="row p-20">
                <div className="mdl-card__supporting-text">
                    <div className="mdl-color-text--grey-700">
                        <div className="pull-left">
                            <p><strong>{blog.postDate} by <Link to="/about">Marie Mills</Link></strong></p>
                        </div>
                        <div className="pull-right">
                            <i className="glyphicon glyphicon-heart fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="glyphicon glyphicon-bookmark fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="fa fa-share-alt fa-lg" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <div className="mdl-card__supporting-text">
                    <p className="dark-color">
                        <MultilineText multilineText={previewText(blog.short)} />
                    </p>
                </div>
            </div>
            <div className="mdl-card__actions mdl-card--border">
                <Link key={blog.route} to={'/' + blog.type + '/' + blog.id} className="dark-color btn btn-default btn-block" activeClassName="active">Read More</Link>
            </div>
        </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.array.isRequired
};

export default Blog;