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
        const {blogs} = this.props;

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row m-t-30 m-b-30">
                            <div className="col-xs-offset-1 col-xs-10 m-b-30">
                                <h1 className="text-center color-white">My Blog</h1>
                                <h2 className="text-center color-white">Read useful information on Yoga and Ayurveda</h2>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="col-3-masonry">
                                        {blogs.map(blog =>
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
                                                        <p className="dark-color">{blog.description}</p>
                                                    </div>
                                                </div>
                                                <div className="mdl-card__actions mdl-card--border">
                                                    <Link key={blog.route} to={'/' + blog.type + '/' + blog.id} className="dark-color btn btn-default btn-block" activeClassName="active">Read More</Link>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


BlogPage.propTypes = {
    blogs: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        blogs: state.blogs
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);





