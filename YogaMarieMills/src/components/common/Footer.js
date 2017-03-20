import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

class Footer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false
        };
    }

    render() {
        
        return (
            <div className="text-center">
                <Link to="/Login">Login</Link>
            </div>
        );
    }
}

export default Footer;