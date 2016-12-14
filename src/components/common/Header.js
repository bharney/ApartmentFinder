import React, {PropTypes} from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as navbarActions from '../../actions/navbarActions';
import Navbar from './Navbar';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.redirectToNavbarItemPage = this.redirectToNavbarItemPage.bind(this);
    }

    navbarItem(item, index) {
        return <div key={index}>{item.name}</div>
    }

    redirectToNavbarItemPage() {
        browserHistory.push(`/ {item.name}`);
    }

    render() {
        const {navbar_items} = this.props;

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <IndexLink to="/" className="navbar-brand" activeClassName="active">Home</IndexLink>
                    </div>
                    <div className="navbar-collapse collapse" id="js-navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            {navbar_items.map(item =>
                                <Navbar key={item.name} item={item}/>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

//import React, {PropTypes} from 'react';
//import { Link, IndexLink, browserHistory } from 'react-router';
//import {connect} from 'react-redux';
//import {bindActionCreators} from 'redux';
//import * as navbarActions from '../../actions/navbarActions';
//import Navbar from './Navbar';

//class Header extends React.Component {
//    constructor(props, context) {
//        super(props, context);
//        this.redirectToNavbarItemPage = this.redirectToNavbarItemPage.bind(this);
//    }

//    navbarItem(item, index) {
//        return <div key={index}>{item.name}</div>
//    }

//    redirectToNavbarItemPage() {
//        browserHistory.push(`/ {item.name}`);
//    }

//    render() {
//        const {navbar_items} = this.props;

//        return (
//            <nav className="navbar navbar-inverse navbar-fixed-top">
//                <div className="container-fluid">
//                    <div className="navbar-header">
//                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
//                            <span className="sr-only">Toggle navigation</span>
//                            <span className="icon-bar"></span>
//                            <span className="icon-bar"></span>
//                            <span className="icon-bar"></span>
//                        </button>
//                        <IndexLink to="/" className="navbar-brand" activeClassName="active">Home</IndexLink>
//                    </div>
//                    <div className="navbar-collapse collapse" id="js-navbar-collapse">
//                        <ul className="nav navbar-nav navbar-right">
//                            {navbar_items.map(item =>
//                                <Navbar item={item}/>
//                            ) }
//                        </ul>
//                    </div>
//                </div>
//            </nav>
//        );
//    };
//}

//function mapStateToProps(state, ownProps) {
//    return {
//        navbar_items: state.navbar_items
//    };
//}
//function mapDispatchToProps(dispatch) {
//    return {
//        actions: bindActionCreators(navbarActions, dispatch)
//    };
//}

//export default connect(mapStateToProps, mapDispatchToProps)(Header);

//import React, {PropTypes} from 'react';
//import { Link, IndexLink } from 'react-router';
//import Navbar from './common/Navbar';

//const Header = () => {
//    return (
//        <nav className="navbar navbar-inverse navbar-static-top">
//            <div className="container-fluid">
//                <div className="navbar-header">
//                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#js-navbar-collapse">
//                        <span className="sr-only">Toggle navigation</span>
//                        <span className="icon-bar"></span>
//                        <span className="icon-bar"></span>
//                        <span className="icon-bar"></span>
//                    </button>
//                    <IndexLink to="/" className="navbar-brand" activeClassName="active">Home</IndexLink>
//                </div>
//                <div className="navbar-collapse collapse" id="js-navbar-collapse">
//                    <ul className="nav navbar-nav navbar-right">
//                        <li>
//                            <Link to="/about" activeClassName="active">About</Link>
//                        </li>
//                        <li>
//                            <Link to="/courses" activeClassName="active">Courses</Link>
//                        </li>
//                        <li>
//                            <Link to="/schedule" activeClassName="active">Schedule</Link>
//                        </li>
//                    </ul>
//                </div>
//            </div>
//        </nav>
//    );
//};

//export default Header;



