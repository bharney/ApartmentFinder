import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classTypesActions from '../../actions/classTypesActions';
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
                    <div key={classType.id} className="row vertical-center">
                        <div className="half">
                            <img className="img-responsive" src={landing} />
                        </div>
                        <div className="half">
                            <Link to={'/' + classType.route + '/' + classType.id} className="color">
                                <div className="row">
                                    <div className="col-xs-offset-1 col-xs-10 tile m-t--5-percent">
                                        <h2 className="page-header banner">{classType.name}</h2>
                                        <p >{classType.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div key={classType.id} className="row vertical-center">
                        <div className="half">
                            <Link to={'/' + classType.route + '/' + classType.id} className="color">
                                <div className="row">
                                    <div className="col-xs-offset-1 col-xs-10 tile m-t--5-percent">
                                        <h2 className="page-header banner">{classType.name}</h2>
                                        <p>{classType.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="half">
                            <img className="img-responsive" src={landing} />
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="container-fluid">
                <div className="row bright-bg-color">
                    <div className="col-xs-offset-1 col-xs-10">
                        <h1 className="text-center color-white">Yoga Thurles Class Types</h1>
                    </div>
                </div>
                <hr className="m-b-0 m-t-0" />
                {classTypes.map(classType => alternateTileSides(classType))}
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