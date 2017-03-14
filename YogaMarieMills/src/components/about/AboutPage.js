import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as navbarActions from '../../actions/navbarActions';
import profileSmall from '../../images/Profile204x300.jpg';
import profileLarge from '../../images/Profile400x589.jpg';
import SocialMediaBar from '../common/SocialMediaBar';

const styles = {

}



class AboutPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { navbar_items } = this.props;

        return (
            <div className="mdl-grid dark-color">
                <div className="container-fluid p-l-0 p-r-0">
                    <div className="ribbon bg-image-landing b-border">

                        <div className="container">
                            <div className="row color-white">
                                <div className="col-xs-12 col-sm-7">
                                    <h2 className="m-b-0 p-b-0"><strong>Marie Mills Yoga and Ayurveda</strong></h2>
                                    <h4 className="m-t-0 m-b-0 p-t-0">Stress Reduction Specialist</h4>
                                </div>
                                <div className="m-t-1-em col-xs-12 col-sm-5">
                                    <div className="pull-right">
                                        <SocialMediaBar />
                                        <h4 className="m-b-1-em m-t-0 p-t-0 p-r-15 text-right">+086 1778369</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8">
                            <div className="mdl-card p-l-0 p-r-0 container m-t-1-em m-b-1-em mdl-shadow--4dp">
                                <div className="row m-l-0 m-r-0 lg-vertical-center">
                                    <div className="color-white text-center m-l-0 p-l-0">
                                        <div className="profile-image max-w-245 xs-profile">
                                            <img src={profileLarge} className="img-responsive hidden-xs" alt="Marie Mills Yoga Instructor and Owner" />
                                            <img src={profileSmall} className="img-responsive img-circle visible-xs" alt="Marie Mills Yoga Instructor and Owner" />
                                            <div className="profile-text text-left align-bottom m-l-10">
                                                <h3 className="m-t-0 m-b-0">Marie Mills</h3>
                                                <p className="m-t-0 m-b-5">Owner and Instructor</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 text-center pull-right">
                                        <h4 className="text-left p-l-30 p-r-30 m-t-5">
                                            <strong>About Marie:</strong>
                                            <hr />
                                            <div className="text-center">Twelve years teaching Hatha Yoga, meditation, mindfulness techniques and
                                    stress relief for all ages. And also nine years using Ayurveda medicine
                                    with clients and students to find balance in these unbalancing times.</div>
                                        </h4>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="text-center color-white p-t-1-em p-b-1-em">
                                        <blockquote className="bigquote no-left-border">All of life is an individual manifestation and
                                    combination of the five elements. It really doesn't get
                                    any easier! As a wise friend of mine once said, 'If it's not fun,
                                    it's not Yoga, and if it's not simple, it's not Ayurveda.
                                                        </blockquote>
                                        <p className="col-lg-offset-6">
                                            Marie Mills
                                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-header">
                            <h2 className="text-center">Contact Marie Mills</h2>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="mdl-card p-1-em mdl-shadow--4dp">
                                        <div className="featured clearfix text-center">
                                            <div className="row dark-color">
                                                <div className="col-xs-12">
                                                    <p>
                                                        <br />
                                                        <Link title="Yoga" className="schedule dark-color" to="http://yogamariemills.com/thurles-className-schedule/" target="_blank">Yoga</Link> and <Link title="Ayurveda massage treatments" className="ayurveda dark-color" to="http://yogamariemills.com/ayurveda-massage-treatments/" target="_blank">
                                                            Ayurveda's wisdom is in its simplicity
                                                            </Link>
                                                    </p>
                                                    <ul className="list-unstyled">
                                                        <li>Contact me for a Yoga className or Ayurvedic consultation or treatment</li>
                                                        <li>Phone: 086 1778369</li>
                                                        <li><Link to="mailto:marie@yogamariemills.com">marie@yogamariemills.com</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <section>
                            <fieldset className="container m-b-1-em">
                                <div className="row">
                                    <div className="col-lg-10 col-lg-offset-1 col-xs-12 text-center">
                                        <h3 className="text-center">You can also email me using the form below</h3>
                                        <hr />
                                        <form action="/" method="post">
                                            <div className="col-lg-4 col-sm-4 col-xs-12 m-b-05-em">
                                                <input required type="text" name="Name" className="form-control form-group" placeholder="Name" />
                                            </div>
                                            <div className="col-lg-4 col-sm-4 col-xs-12">
                                                <input type="email" name="EmailAddress" className="form-control form-group" placeholder="Email" />
                                            </div>
                                            <div className="col-lg-4 col-sm-4 col-xs-12">
                                                <input type="text" name="Phone" className="form-control form-group" placeholder="Phone" />
                                            </div>
                                            <div className="col-lg-12 col-xs-12">
                                                <textarea style={styles.Message} name="Message" spellcheck="true" className="form-control form-group" rows="8" placeholder="Your message here..."></textarea>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-sm-offset-4 col-sm-4 col-xs-12">
                                    <div className="btn btn-success btn-lg btn-block center-block">
                                        <Link to="" className="dark-color m-b-1-em" activeClassName="active"><span>Send <i className="glyphicon glyphicon-send"></i></span></Link>
                                    </div>
                                </div>
                            </fieldset>
                        </section>
                    </div>
                </div>
            </div >
        );
    }
}

AboutPage.propTypes = {
    navbar_items: PropTypes.array.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        navbar_items: state.navbar_items
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(navbarActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);



// color-white text-center m-l-0 p-l-0
// position: relative;
//     /* left: 15%; */
//     padding-top: 30px;
//     border-radius: 50%;
//     display: inline-block;