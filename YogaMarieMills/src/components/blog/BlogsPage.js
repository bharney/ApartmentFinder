import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import MultilineText from '../common/MultilineText';
import { bindActionCreators } from 'redux';
import Admin from '../common/Admin';
import * as blogActions from '../../actions/blogActions';

class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { blogs } = this.props;
        const {authorized} = this.props;
        function blogImage(image) {
            let blogImg = image != "" ? require(`../../images/${image}`) : ""
            const styles = {
                blog: {
                    img: {
                        backgroundImage: 'url(' + blogImg + ')',
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                    }
                }
            }
            return styles.blog.img
        }

        function previewText(short) {
            return short.substring(0, 500) + "...";
        }

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row m-b-1-em">
                            <div className="col-sm-offset-1 col-sm-10 col-xs-12 m-b-1-em">
                                <h1 className="text-center color-white">My Blog</h1>
                                <Admin objArr={blogs} authorized={authorized} />
                                <h2 className="text-center color-white">Read useful information on Yoga and Ayurveda</h2>
                                <div className="responsive-col-masonry">
                                    {blogs.map(blog =>
                                        <div className="mdl-card mdl-shadow--4dp m-t-1-em tile-masonry bg-color-white">
                                            <div className="mdl-card__title">
                                                <div className="mdl-card__title-text">
                                                    <section className="text-center">
                                                        <h2>{blog.title}</h2>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="mdl-card__media bright-bg-color v-h-25" style={blogImage(blog.image)}>
                                            </div>
                                            <div className="row p-2-em">
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
                                                <Link key={blog.id} to={'/' + blog.type + '/' + blog.id} className="dark-color btn btn-default btn-block" activeClassName="active">Read More</Link>
                                            </div>
                                        </div>
                                    )}
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
        blogs: state.blogs,
        authorized: state.authToken
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);