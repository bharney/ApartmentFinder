import React, {PropTypes} from 'react';
import { Link } from 'react-router';

const Navbar = ({item}) => {
    return (
        <li>
            <Link key={item.route} to={'/' + item.route} activeClassName="active">{item.name}</Link>
        </li>
    );
};

Navbar.propTypes = {
    item: PropTypes.array.isRequired
};

export default Navbar;

//const Navbar = ({item}) => {
//    return (
//        <li>
//            <Link key={item.route} to={'/' + item.route} activeClassName="active">{item.name}</Link>
//        </li>
//    );
//};

//Navbar.propTypes = {
//    item: PropTypes.array.isRequired
//};

//export default Navbar;