import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../actions/authTokenActions';
import authTokenReducer from '../../reducers/authTokenReducer';
import LoginForm from './LoginForm';


class ManageLoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    debugger;
    this.state = {
      login: Object.assign({}, props.login),
      errors: {},
      saving: false
    };
    debugger;
    this.updateLoginState = this.updateLoginState.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
  }

  updateLoginState(event) {
    const field = event.target.name;
    let login = this.state.login;
    login[field] = event.target.value;
    return this.setState({ login: login });
  }

  loginRequest(event) {
    event.preventDefault();
    this.props.actions.loginRequest(this.state.login);
  }

  render() {
    let {errorMessage} = this.props
    debugger;
    return (
      <LoginForm
        errorMessage={errorMessage}
        onChange={this.updateLoginState}
        loginRequest={this.loginRequest}
        login={this.state.login}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageLoginPage.propTypes = {
  login: PropTypes.object.isRequired,
  errorMessage: PropTypes.object,
  actions: PropTypes.object.isRequired
};

ManageLoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let login = {
    emailAddress: '',
    password: '',
  };
  debugger;
  return {
    login: login,
    errorMessage: state.authToken.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoginPage);
