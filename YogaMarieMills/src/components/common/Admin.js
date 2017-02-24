import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageUpload from './ImageUpload';

const Admin = ({uploadImage, saveAction, deleteAction, addAction, editAction}) => {
    function setAdminButtons(uploadImage, saveAction, deleteAction, addAction, editAction) {
        let adminButtons = [];
        if (uploadImage != undefined)
            adminButtons.push("uploadImage");
        if (saveAction != undefined)
            adminButtons.push("saveAction");
        if (deleteAction != undefined)
            adminButtons.push("deleteAction");
        if (addAction != undefined)
            adminButtons.push("addAction");
        if (editAction != undefined)
            adminButtons.push("editAction");
        return adminButtons;
    }

    function getRoute(obj) {
        if (obj.length) {
            return obj[0].type
        }
    }

    function displayAdminButtons(adminButton) {
        switch (adminButton) {
            case "addAction":
                return (
                    <Link to={'/' + getRoute(addAction)} className="fixed top-10" >
                        <button type="button" className="relative m-t-5 btn btn-success btn-circle-lg" title="Add Record"><i className="glyphicon glyphicon-plus"></i></button>
                    </Link>
                )
            case "editAction":
                return (
                    <Link to={'/' + editAction.type + '/' + editAction.id}>
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

    return (
        <div className="absolute top-15-right-1">
            {adminButtons.map(adminButton =>
                <div className="relative m-t-5">
                    {displayAdminButtons(adminButton)}
                </div>
            )}
        </div>
    );
}

export default Admin;