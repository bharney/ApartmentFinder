import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import LoginForm from './LoginForm';


class ManageLoginPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      login: Object.assign({}, props.login),
      errors: {},
      saving: false
    };
    this.updateLoginState = this.updateLoginState.bind(this);
    this.authenticateLogin = this.authenticateLogin.bind(this);
  }

  updateLoginState(event){
    const field = event.target.name;
    let login = this.state.login;
    login[field] = event.target.value;
    return this.setState({login: login});
  }

  authenticateLogin(event){
    event.preventDefault();
    this.props.actions.saveLogin(this.state.login);
    this.context.router.push('/logins');
  }

  render() {
    return (
      <LoginForm
        onChange={this.updateLoginState}
        authenticateLogin={this.authenticateLogin}
        login={this.state.login}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageLoginPage.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageLoginPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  let login = {
    email: '',
    password: ''
  };

  return {
    login: login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageLoginPage);
