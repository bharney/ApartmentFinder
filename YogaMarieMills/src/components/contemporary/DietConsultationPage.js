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
        const { dietConsultations } = this.props;

        let displayIcon = function (icon, iconWidth, iconHeight) {
            
            let requireImg = icon ? require(`../../images/${icon}`) : ""
            const iconImg = {
                backgroundImage: 'url(' + requireImg + ')',
                backgroundSize: `${iconWidth} ${iconHeight}`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }
            return (<div className="icon-circle-sm mdl-pos-rel bg-color-green mdl-shadow--4dp m-t--60" style={iconImg}></div>)
        }
        
        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row m-t-30 m-b-30 text-center">
                            <div className="col-xs-12 col-sm-12 col-md-offset-1 col-md-10 m-b-30">
                                <h1 className="color-white">Aryuvedic Diet Consultation</h1>
                                <h3 className="color-white">{dietConsultations.short}</h3>
                                <div className="mdl-card mdl-shadow--4dp p-1-em">
                                    <h3>{dietConsultations.short}</h3>
                                    <h3>Venue: {dietConsultations.venue}</h3>
                                    <div className="row">
                                        <div className="col-xs-12 col-sm-offset-1 col-sm-10">
                                            {dietConsultations.consultationDetails.map(consultationDetails =>
                                                <div className="col-xs-12 col-sm-6">
                                                    <div className="mdl-card mdl-shadow--8dp bg-color-light-orange m-t-30 p-1-em allow-overflow">
                                                        {displayIcon(consultationDetails.icon, consultationDetails.iconWidth, consultationDetails.iconHeight)}
                                                        <h3>{consultationDetails.title}<br />
                                                            {consultationDetails.cost}</h3>
                                                        <p>{consultationDetails.session_time}</p>
                                                        <p>{consultationDetails.consultation}</p>
                                                        <p>{consultationDetails.consultation_desc}</p>
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


