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
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div className="container-fluid">
                        <div className="row m-b-30">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h1 className="text-center color-white">My Blog</h1>
                                <h2 className="text-center color-white">Read useful information on Yoga and Ayurveda</h2>
                                {blogs.map(blog =>
                                    <div className="col-xs-12 col-md-4 m-b-40">
                                        <div div className="mdl-card mdl-shadow--4dp tile">
                                            <div className="mdl-card__title">
                                                <div className="mdl-card__title-text">
                                                    <section className="text-center">
                                                        <h2>{blog.name}</h2>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="mdl-card__media bright-bg-color">
                                                <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                                                    <img width="200" className="img-circle" src={blog.image} />
                                                </div>
                                            </div>
                                            <div className="mdl-card__supporting-text">
                                                <p className="dark-color">{blog.description}</p>
                                            </div>
                                            <div className="mdl-card__actions mdl-card--border">
                                                <Link key={blog.route} to={'/' + blog.route + '/' + blog.id} className="dark-color btn btn-default btn-block" activeClassName="active">{blog.name}</Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
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





