import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as massageActions from '../../actions/massageActions';
import MassageForm from './MassageForm';
import Admin from '../common/Admin';
import TextInput from '../common/TextInput';

class ManageMassagePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      massage: Object.assign({}, props.massage),
      errors: {},
      saving: false
    };
    this.updateMassageState = this.updateMassageState.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveMassage = this.saveMassage.bind(this);
    this.deleteMassage = this.deleteMassage.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addRow = this.addRow.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    debugger;
    if (this.props.massage.id != nextProps.massage.id) {
      debugger;
      this.setState({ massage: Object.assign({}, nextProps.massage) });
    }
  }

  updateMassageState(event) {
    const field = event.target.name;
    let massage = this.state.massage;
    massage.session_details[parseInt(field)].session_time = event.target.value;
    return this.setState({ massage });
  }

  saveMassage(event) {
    debugger;
    event.preventDefault();
    let massage = this.state.massage;
    this.setState({ massage });
    this.props.actions.saveMassage(this.state.massage);
    this.context.router.push('/YogaThurles/Massage');
  }

  deleteMassage(event) {
     debugger;
    this.props.actions.deleteMassage(this.state.massage.id);
    this.props.actions.loadMassage();
    this.context.router.push('/YogaThurles/Massage');
  }

  addRow() {
    let massage = this.state.massage;
    massage.massage_details.push({ id: massage.massage_details.length, session_time: '', class: '' })
    this.setState({ massage });
  }

  removeRow(event) {
    const field = event.target.name;
    let massage = this.state.massage;
    massage.session_details.splice(parseInt(field), 1)
    this.setState({ massage });
  }

  uploadImage(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let blog = this.state.blog;
      blog.image = file.name
      this.props.upload.uploadFile(file);
      return this.setState({ blog: blog });
    }
    reader.readAsDataURL(file)
  }

  render() {
    return (
      <div className="mdl-grid dark-color bg-color">
        <div className="ribbon bg-image-landing b-border">
          <div className="container-fluid">
            <div className="row m-b-30">
              <div className="col-xs-12 col-sm-offset-1 col-sm-10 m-b-30">
                <Admin saveAction={this.saveMassage} deleteAction={this.deleteMassage} />
                <br />
                <br />
                <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 m-b-30">
                  <div className="mdl-card mdl-shadow--4dp p-t-05-em p-l-1-em p-r-1-em p-b-05-em">
                    <button type="button" className="relative-top-right m-t-5 btn btn-success btn-circle-lg" onClick={this.addRow} title="Add Row"><i className="glyphicon glyphicon-plus"></i></button>
                    <MassageForm
                      updateMassageState={this.updateMassageState}
                      uploadImage={this.uploadImage}
                      removeRow={this.removeRow}
                      massage={this.state.massage}
                      errors={this.state.errors}
                      saving={this.state.saving}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManageMassagePage.propTypes = {
  massage: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

ManageMassagePage.contextTypes = {
  router: PropTypes.object
};


function getMassageByType(massageTypes, type, id) {
    const massageType = massageTypes.filter(massageType => massageType.type == type);
    const massage = massageType[0].massages.filter(massage => massage.id == id);
    debugger;
      if (massage.length) {
        return massage[0];
      }

    return null;
}

function mapStateToProps(state, ownProps) {
  const massageTypeId = ownProps.params.type;
  const massageId = ownProps.params.id;

  let massage = { 
    id: '', 
    session_time: '', 
    title: '', 
    description: '', 
    cost: '', 
    icon: '', 
    iconHeight: '', 
    iconWidth: '', 
    massage_details: [{ 
      id: '', 
      title: '', 
      description: '' }] 
    };
  debugger;
  if (massageTypeId && massageId && state.massageTypes.length > 0) {
    debugger;
      massage = getMassageByType(state.massageTypes, massageTypeId, massageId);
  }

  return {
    massage: massage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(massageActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageMassagePage);



