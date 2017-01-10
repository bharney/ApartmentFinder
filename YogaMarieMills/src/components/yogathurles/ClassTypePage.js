﻿import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classTypesActions from '../../actions/classTypesActions';


class ClassTypePage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classType} = this.props;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-10 text-center">
                        <h1>{classType.name}</h1>
                        <img src={classType.image} />
                        <p>{classType.class_details}</p>
                    </div>
                </div>
            </div>
        );
    }
}

ClassTypePage.propTypes = {
    classType: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};


function getClassTypeById(classTypes, id) {
    const classType = classTypes.filter(classType => classType.id == id);
    if (classType.length) {
        return classType[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const classTypeId = ownProps.params.id;
    let classType = { id: '', name: '', image: '', description: '', href: '', route: '', component: '' };
    if (classTypeId && state.classTypes.length > 0) {
        classType = getClassTypeById(state.classTypes, classTypeId);
    }

    return {
        classType: classType
    };
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(classTypesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypePage);
