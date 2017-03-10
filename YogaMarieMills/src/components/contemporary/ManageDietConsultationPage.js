import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dietConsultationActions from '../../actions/dietConsultationActions';
import DietConsultationForm from './DietConsultationForm';
import Admin from '../common/Admin';
import TextInput from '../common/TextInput';

class ManageDietConsultationPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
    ]);

    let blocks = convertFromRaw(blocks = { blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } });
    if (props.dietConsultation.description != "")
      blocks = convertFromRaw(JSON.parse(props.dietConsultation.description));

    this.state = {
      dietConsultation: Object.assign({}, props.dietConsultation),
      editorState: EditorState.createWithContent(
        blocks,
        decorator,
      ),
      errors: {},
      saving: false
    };
    this.updateDietConsultationState = this.updateDietConsultationState.bind(this);
    this.updateDescriptionState = this.updateDescriptionState.bind(this);
    this.updateTitleState = this.updateTitleState.bind(this);
    this.saveDietConsultation = this.saveDietConsultation.bind(this);
    this.deleteDietConsultation = this.deleteDietConsultation.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.addRow = this.addRow.bind(this);
    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.getTextFromEntity = this.getTextFromEntity.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.dietConsultation.id != nextProps.dietConsultation.id) {
      this.setState({ dietConsultation: Object.assign({}, nextProps.dietConsultation) });
      const blocks = convertFromRaw(JSON.parse(nextProps.dietConsultation.description));
      const editorState = EditorState.push(this.state.editorState, blocks);
      this.setState({ editorState });
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  focus() {
    this.refs.editor.focus();
  }

  getTextFromEntity(editorObj) {
    let descriptionBlocks = [];
    for (let prop in editorObj.blocks) {
      if (editorObj.blocks.hasOwnProperty(prop)) {
        descriptionBlocks.push(editorObj.blocks[prop].text)
      }
    }
    return descriptionBlocks.join("\\n ");
  }

  updateTitleState(event) {
    const field = event.target.name;
    let dietConsultation = this.state.dietConsultation;
    dietConsultation.dietConsultation_details[parseInt(field)].title = event.target.value;
    return this.setState({ dietConsultation });
  }

  updateDescriptionState(event) {
    const field = event.target.name;
    let dietConsultation = this.state.dietConsultation;
    dietConsultation.dietConsultation_details[parseInt(field)].description = event.target.value;
    return this.setState({ dietConsultation });
  }

  updateDietConsultationState(event) {
    const field = event.target.name;
    let dietConsultation = this.state.dietConsultation;
    dietConsultation[field] = event.target.value;
    return this.setState({ dietConsultation });
  }

  saveDietConsultation(event) {
    event.preventDefault();
    let dietConsultation = this.state.dietConsultation;
    if (!dietConsultation.icon)
    {
      dietConsultation.icon = 'whitearomaoil.png';
      dietConsultation.iconHeight = '3em';
      dietConsultation.iconWidth = '1.8em';
    }
    this.setState({ dietConsultation });
    this.props.actions.saveDietConsultation(this.state.dietConsultation);
    this.context.router.push('/Ayurveda/DietConsultation' + dietConsultation.type);
  }

  deleteDietConsultation(event) {
    this.props.actions.deleteDietConsultation(this.state.dietConsultation.id);
    this.props.actions.loadDietConsultation();
    this.context.router.push('/Ayurveda/DietConsultation/' + this.state.dietConsultation.type);
  }

  addRow() {
    let dietConsultation = this.state.dietConsultation;
    dietConsultation.dietConsultation_details.push({ id: dietConsultation.dietConsultation_details.length, session_time: '', class: '' })
    this.setState({ dietConsultation });
  }

  removeRow(event) {
    const rowNumber = event.currentTarget.name;
    let dietConsultation = this.state.dietConsultation;
    dietConsultation.dietConsultation_details.splice(parseInt(rowNumber), 1)
    this.setState({ dietConsultation });
  }

  render() {
    return (
      <div className="mdl-grid dark-color bg-color">
        <div className="ribbon bg-image-landing b-border">
          <div className="container-fluid">
            <div className="row m-b-30">
              <div className="col-xs-12 col-sm-offset-1 col-sm-10 m-b-30">
                <Admin saveAction={this.saveDietConsultation} deleteAction={this.deleteDietConsultation} />
                <br />
                <br />
                <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6 m-b-30">
                  <div className="mdl-card mdl-shadow--4dp p-t-05-em p-l-1-em p-r-1-em p-b-05-em">
                    <DietConsultationForm
                      updateTitleState={this.updateTitleState}
                      updateDescriptionState={this.updateDescriptionState}
                      updateDietConsultationState={this.updateDietConsultationState}
                      removeRow={this.removeRow}
                      dietConsultation={this.state.dietConsultation}
                      errors={this.state.errors}
                      saving={this.state.saving}
                      onChange={this.onChange}
                      editorState={this.state.editorState}
                      ref="editor"
                      focus={focus}
                      />
                      <Link className="text-right" to="" onClick={this.addRow} >
                        <button type="button" className="btn btn-success btn-circle-lg" title="Add Row"><i className="glyphicon glyphicon-plus"></i></button>
                      </Link>
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

ManageDietConsultationPage.propTypes = {
  dietConsultation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

ManageDietConsultationPage.contextTypes = {
  router: PropTypes.object
};


function getEntityStrategy(mutability) {
  return function (contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return contentState.getEntity(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'MUTABLE': return null;
    default: return null;
  }
}

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    props.contentState.getEntity(props.entityKey).getMutability()
  );
  return (
    <span data-offset-key={props.offsetkey}>
      {props.children}
    </span>
  );
};

function getDietConsultationByTypeAndId(dietConsultationTypes, type, id) {
    const dietConsultationType = dietConsultationTypes.filter(dietConsultationType => dietConsultationType.type == type);
    const dietConsultation = dietConsultationType[0].dietConsultations.filter(dietConsultation => dietConsultation.id == id);
      if (dietConsultation.length) {
        return dietConsultation[0];
      }

    return null;
}

function mapStateToProps(state, ownProps) {
  const dietConsultationTypeId = ownProps.params.type;
  const dietConsultationId = ownProps.params.id;

  let dietConsultation = { 
    id: '', 
    type: dietConsultationTypeId,
    session_time: '', 
    title: '', 
    description: '', 
    cost: '', 
    icon: 'whitearomaoil.png', 
    iconHeight: '3em', 
    iconWidth: '1.8em', 
    dietConsultation_details: [{ 
      id: '', 
      title: '', 
      description: '' }] 
    };

  if (dietConsultationTypeId && dietConsultationId && state.dietConsultationTypes.length > 0) {
      dietConsultation = getDietConsultationByTypeAndId(state.dietConsultationTypes, dietConsultationTypeId, dietConsultationId);
  }

  return {
    dietConsultation: dietConsultation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dietConsultationActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageDietConsultationPage);



