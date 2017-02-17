import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUpload from './ImageUpload';
import * as blogActions from '../../actions/blogActions';

const Admin = ({uploadImage, blog}) => {

    return (
        <div className="absolute pull-right">
            <div className="relative m-t-5">
                <button type="button" className="btn btn-primary btn-circle-lg" title="Edit Record"><i className="glyphicon glyphicon-pencil"></i></button>
            </div>
            <div className="relative m-t-5">
                <button type="button" className="btn btn-success btn-circle-lg" title="Add Record"><i className="glyphicon glyphicon-ok"></i></button>
            </div>
            <div className="relative m-t-5">
                <ImageUpload uploadImage={uploadImage} />
            </div>
            <div className="relative m-t-5">
                <button type="button" className="btn btn-danger btn-circle-lg" title="Delete Record"><i className="glyphicon glyphicon-remove"></i></button>
            </div>

        </div>
    );
}

export default Admin;