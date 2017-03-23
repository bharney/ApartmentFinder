import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authTokenActions from '../../actions/authTokenActions';

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            login: "Login",
        };
        debugger;
    }

    render() {
        const { login } = this.props;
        debugger;
        return (
            <span><Link to={`/${login}`}>{login}</Link></span>
        );
    }
}

Login.propTypes = {
    login: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

Login.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state) {
    let login = "Login"

    return {
        login: login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authTokenActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
