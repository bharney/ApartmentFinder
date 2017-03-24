import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUpload from './ImageUpload';

const Admin = ({uploadImage, saveAction, deleteAction, addAction, editAction, authorized}) => {
    function setAdminButtons(uploadImage, saveAction, deleteAction, addAction, editAction) {
        let adminButtons = [];
        if (uploadImage)
            adminButtons.push("uploadImage");
        if (saveAction)
            adminButtons.push("saveAction");
        if (deleteAction)
            adminButtons.push("deleteAction");
        if (addAction)
            adminButtons.push("addAction");
        if (editAction)
            adminButtons.push("editAction");
        return adminButtons;
    }

    function displayAdminButtons(adminButton) {
        switch (adminButton) {
            case "addAction":
                return (
                    <a href={'/' + addAction} className="fixed top-10" >
                        <button type="button" className="relative m-t-5 btn btn-success btn-circle-lg" title="Add Record"><i className="glyphicon glyphicon-plus"></i></button>
                    </a>
                )
            case "editAction":
                return (
                    <Link to={'/' + editAction}>
                        <button type="button" className="btn btn-primary btn-circle-lg" title="Edit"><i className="glyphicon glyphicon-pencil"></i></button>
                    </Link>
                    )
            case "saveAction":
                return (<button type="button" className="btn btn-success btn-circle-lg" onClick={saveAction} title="Save"><i className="glyphicon glyphicon-ok"></i></button>)
            case "uploadImage":
                return (<ImageUpload uploadImage={uploadImage} />)
            case "deleteAction":
                return (<button type="button" className="btn btn-danger btn-circle-lg" onClick={deleteAction} title="Delete Record"><i className="glyphicon glyphicon-remove"></i></button>)
            default:
                break;
        }
    }

    let adminButtons = setAdminButtons(uploadImage, saveAction, deleteAction, addAction, editAction);

    function authorizeAdminButtons(authorized) {
        if (authorized.authToken)
        return (
            <div className="absolute top-15-right-1">
                {adminButtons.map(adminButton =>
                    <div className="relative m-t-5">
                        {displayAdminButtons(adminButton)}
                    </div>
                )}
            </div>
        );
     return ""
    }

    return (
        <div>
            {authorizeAdminButtons(authorized)}
        </div>
    );
}

export default Admin;