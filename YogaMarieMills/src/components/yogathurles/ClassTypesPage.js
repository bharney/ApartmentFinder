import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classTypesActions from '../../actions/classTypesActions';
import Admin from '../common/Admin';
import MultilineText from '../common/MultilineText';
import landing from '../../images/landing.jpg';


class ClassTypesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classTypes} = this.props;
        
        function classTypeImage (image){
            let backgroundImg = image != "" ? require(`../../images/${image}`) : ""

            const imageStyle = {
                backgroundImage: 'url(' + backgroundImg + ')',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }
            return imageStyle
        }
        

        function previewText(short) {
            return short.substring(0, 500) + "...";
        }
        let alternateTileSides = function (classTypes, classType) {
            if (classType.title)
               if(classTypes.findIndex(i => i.id == classType.id)%2 == 0) {
                return (
                    <div key={classType.id} className="v-align-middle clear-cols bg-color-white">
                        <div className="flex-col tile-col col-xs-12 col-sm-6 p-l-0 p-r-0">
                            <div className="v-align-flex" style={classTypeImage(classType.image)} >
                                <div className="place-holder-col">
                                    <span></span>
                                    </div>
                                </div>
                        </div>
                        <div className="flex-col tile-col col-xs-12 col-sm-6 p-l-0 p-r-0">
                            <div className="v-align-flex p-2-em">
                            <Admin editAction={classType.type + "/" + classType.id} />
                            <h2 className="page-header banner">{classType.title}</h2>
                            <p>
                                <MultilineText multilineText={previewText(classType.short)} />
                            </p>
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
                );
            }
            else {
                return (
                    <div key={classType.id} className="v-align-middle clear-cols bg-color-white">
                        <div className="flex-col tile-col col-xs-12 col-sm-6 p-l-0 p-r-0">
                            <div className="v-align-flex p-2-em">
                            <Admin editAction={classType.type + "/" + classType.id} />
                            <h2 className="page-header banner">{classType.title}</h2>
                            <p>
                                <MultilineText multilineText={previewText(classType.short)} />
                            </p>
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
                        <div className="flex-col tile-col col-xs-12 col-sm-6 p-l-0 p-r-0">
                            <div className="v-align-flex" style={classTypeImage(classType.image)}>
                                <div className="place-holder-col">
                                    <span></span>
                                    </div>
                                </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className="mdl-grid dark-color bg-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row p-t-40 p-b-40">
                            <div className="col-xs-offset-1 col-xs-10">
                                <h1 className="text-center color-white">Yoga Thurles Class Types</h1>
                                <Admin addAction={classTypes.type} />
                            </div>
                        </div>
                        <div className="p-l-0 p-r-0 p-t-1-em row">
                        {classTypes.map(classType => alternateTileSides(classTypes, classType))}
                        </div>
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



/*

import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as classTypesActions from '../../actions/classTypesActions';
import Admin from '../common/Admin';
import MultilineText from '../common/MultilineText';
import landing from '../../images/landing.jpg';


class ClassTypesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {classTypes} = this.props;

        function previewText(short) {
            return short.substring(0, 500) + "...";
        }
        let alternateTileSides = function (classTypes, classType) {
            if (classType.title)
               if(classTypes.findIndex(i => i.id == classType.id)%2 == 0) {
                return (
                    <div key={classType.id} className="row vertical-center bg-color-white">
                        <div className="half">
                            <img className="img-responsive" src={'../' + classType.image} />
                        </div>
                        <div className="half">
                            <div className="row">
                                <div className="col-xs-offset-1 col-xs-10 tile m-t--5-percent">
                                    <Admin editAction={classType.type + "/" + classType.id} />
                                    <h2 className="page-header banner">{classType.title}</h2>
                                    <p>
                                        <MultilineText multilineText={previewText(classType.short)} />
                                    </p>
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
                                    <Admin editAction={classType.type + "/" + classType.id} />
                                    <h2 className="page-header banner">{classType.title}</h2>
                                    <p>
                                        <MultilineText multilineText={previewText(classType.short)} />
                                    </p>
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
                            <img className="img-responsive" src={'../' + classType.image} />
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
                                <Admin addAction={classTypes.type} />
                            </div>
                        </div>
                        {classTypes.map(classType => alternateTileSides(classTypes, classType))}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypesPage);*/