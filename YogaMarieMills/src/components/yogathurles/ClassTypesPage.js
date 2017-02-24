import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classTypesActions from '../../actions/classTypesActions';
import Admin from '../common/Admin';
import landing from '../../images/landing.jpg';


class ClassTypesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classTypes} = this.props;

        let alternateTileSides = function (classType) {
            if (classType.id % 2 == 0) {
                return (
                    <div key={classType.id} className="row vertical-center bg-color-white">
                        <div className="half">
                            <img className="img-responsive" src={classType.image} />
                        </div>
                        <div className="half">
                            <div className="row">
                                <div className="col-xs-offset-1 col-xs-10 tile m-t--5-percent">
                                    <Admin editAction={classType} />
                                    <h2 className="page-header banner">{classType.title}</h2>
                                    <p >{classType.description}</p>
                                    <Link to={'/' + classType.route + '/' + classType.id}>
                                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                                            Read More
                                    <span className="mdl-button__ripple-container">
                                                <span className="mdl-ripple">
                                                </span>
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div key={classType.id} className="row vertical-center bg-color-white">
                        <div className="half">

                            <div className="row">
                                <div className="col-xs-offset-1 col-xs-10 tile m-t--5-percent">
                                    <Admin editAction={classType} />
                                    <h2 className="page-header banner">{classType.title}</h2>

                                    <p>{classType.description}</p>
                                    <Link to={'/' + classType.route + '/' + classType.id}>
                                        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect">
                                            Read More
                                    <span className="mdl-button__ripple-container">
                                                <span className="mdl-ripple">
                                                </span>
                                            </span>
                                        </button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div className="half">
                            <img className="img-responsive" src={classType.image} />
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row p-t-40 p-b-40 b-border">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h1 className="text-center color-white">Yoga Thurles Class Types</h1>
                                <Admin addAction={classTypes} />
                            </div>
                        </div>
                        {classTypes.map(classType => alternateTileSides(classType))}
                    </div>
                </div>
            </div>
        );
    }
}

ClassTypesPage.propTypes = {
    classTypes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


function mapStateToProps(state, ownProps) {
    return {
        classTypes: state.classTypes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(classTypesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypesPage);