import React, {PropTypes} from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as blogActions from '../../actions/blogActions';
import Blog from '../blog/Blog';
import SocialMediaBar from '../common/SocialMediaBar';
import landing from '../../images/landing.jpg';

const landingImg = {
    backgroundImage: 'url(' + landing + ')',
    backgroundSize: 'cover',
    backgroundPosition: "center"
};

const rounded = {
    borderRadius: 22.5
};

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToBlogPage = this.redirectToBlogPage.bind(this);
    }

    blogTile(blog, index) {
        return <div key={index}>{blog.name}</div>
    }

    redirectToBlogPage() {
        browserHistory.push(`/ {blog.name}`);
    }
    render() {
        const {blogs} = this.props;

        return (
            <div>
            <section style={landingImg} className="featured">
                <div className="container-fluid">
                    <div className="row mar-bot40">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="align-center">
                                <i className="mar-bot20"></i>
                                <h1 className="slogan">Yoga with Marie Mills</h1>
                                <h4>
                                    Marie Mills is a Stress Reduction Specialist and Yoga practitioner in Thurles.
                                    Yoga and Ayurveda are integral to Traditional Indian Medicine and easily adapted
                                    to the modern life. Learn Yoga, Ayeruveda and more
                                </h4>
                                <div className="row text-center">
                                    <Link style={rounded} to="about" className="btn btn-success btn-lg btn-rounded">My Work</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                    <div className="container-fluid">
                        <div className="row pad-bot40 pad-top40 theme-bg">
                            <div className="col-md-6 col-md-offset-3">
                                <div className="align-center">
                                    <h2>
                                        Yoga with Marie Mills is a family friendly studio that offers a wide variety of classes and child care.
                                    </h2>
                                    <h4>
                                        No matter what stage of life you are in, Yoga with Marie Mills offers something for everyone.
                                        <br/><br/>
                                        Yoga Marie Mills offers Yoga, Ayurveda, and Kids Yoga.
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
            <section>
                <div className="container-fluid">
                        <div className="row pad-bot40 pad-top40">
                            <div className="col-xs-offset-1 col-xs-10">
                            {blogs.map(blog =>
                                <Blog blog={blog}/>)
                            }
                        </div>
                    </div>
                </div>
            </section>
            <SocialMediaBar />
            </div>
        );
    }
}


HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
