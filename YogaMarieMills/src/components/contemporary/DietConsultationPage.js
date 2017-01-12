import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dietConsultationActions from '../../actions/dietConsultationActions';

class DietConsultationPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {dietConsultations} = this.props;

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bright-bg-color">
                    <div id="about" div className="mdl-card container m-t-30 m-b-30 mdl-shadow--4dp">
                        <div className="featured clearfix text-center">
                            <h1>Yoga Thurles</h1>
                            <div className="row">
                                <div className="col-xs-offset-1 col-xs-10">
                                    <div className="col-xs-12 text-left">
                                          <h3>Studio: Bakers street, Thurles, Co. Tipperary</h3>
                                            {dietConsultations.map(dietConsultation =>
                                                {dietConsultations.consultation_header}
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3>Inquiries are welcome. Please contact Marie at 086-1778369</h3>


                        <h3>If you desire a class at a different time or day, six students will make it viable. If a class time is not listed, you can either <a title="Bespoke Yoga courses" href="http://yogamariemills.com/yoga-thurles/class-types/bespoke-yoga-courses/" target="_blank">build a Bespoke class</a> using the Angel shop Yoga room or a venue you provide.</h3>
                        <ul>
                            <li>
                                <h3>Phone Marie on 086 &#8211; 1778369 </h3>
                            </li>
                            <li>
                                <h3>email marie@yogamariemills.com</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

DietConsultationPage.propTypes = {
    dietConsultations: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        dietConsultations: state.dietConsultations
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dietConsultationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DietConsultationPage);


