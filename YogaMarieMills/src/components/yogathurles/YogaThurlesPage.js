import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as scheduleActions from '../../actions/scheduleActions';
import Schedule from './SchedulePage';

class YogaThurlesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    ScheduleTable(schedule, index) {
        return <div key={index}>{schedule.name}</div>
    }

    render() {
        const {schedules} = this.props;

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container">
                        <div className="row m-b-30">
                            <div className="col-xs-12">
                                <h1 className="text-center color-white">Yoga Thurles</h1>
                                <h3 className="color-white" >Studio: Bakers street, Thurles, Co. Tipperary</h3>
                                {schedules.map(schedule =>
                                    <div className="col-xs-12 col-md-6 m-b-30">
                                        <div className="mdl-card mdl-shadow--4dp p-20">
                                            <Schedule schedule={schedule} />
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div className="row m-b-30">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h3>Inquiries are welcome. Please contact Marie at 086-1778369 or email <a href="mailto:marie@yogamariemills.com">marie@yogamariemills.com</a></h3>
                                <h3>If you desire a class at a different time or day, six students will make it viable. If a class time is not listed, you can either <a title="Bespoke Yoga courses" href="http://yogamariemills.com/yoga-thurles/class-types/bespoke-yoga-courses/" target="_blank">build a Bespoke class</a> using the Angel shop Yoga room or a venue you provide.</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

YogaThurlesPage.propTypes = {
    schedules: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        schedules: state.schedules
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(scheduleActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(YogaThurlesPage);


