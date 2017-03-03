import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testimonialActions from '../../actions/testimonialActions';
import TestimonialForm from './TestimonialForm';
import Admin from '../common/Admin';
import TextInput from '../common/TextInput';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';

class ManageTestimonialPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    const decorator = new CompositeDecorator([
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
    ]);

    let blocks = convertFromRaw(blocks = { blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } });
    if (props.testimonial.description != "")
      blocks = convertFromRaw(JSON.parse(props.testimonial.description));

    this.state = {
      testimonial: Object.assign({}, props.testimonial),
      editorState: EditorState.createWithContent(
        blocks,
        decorator,
      ),
      errors: {},
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.focus = this.focus.bind(this);
    this.getTextFromEntity = this.getTextFromEntity.bind(this);
    this.saveTestimonial = this.saveTestimonial.bind(this);
    this.deleteTestimonial = this.deleteTestimonial.bind(this);
    this.updateTestimonialState = this.updateTestimonialState.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.testimonial.id != nextProps.testimonial.id) {
      this.setState({ testimonial: Object.assign({}, nextProps.testimonial) });
      const blocks = convertFromRaw(JSON.parse(nextProps.testimonial.description));
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

  updateTestimonialState(event) {
    const field = event.target.name;
    let testimonial = this.state.testimonial;
    testimonial[field] = event.target.value;
    return this.setState({ testimonial });
  }

  saveTestimonial(event) {
    event.preventDefault();
    let testimonial = this.state.testimonial;
    testimonial.short = this.getTextFromEntity(convertToRaw(this.state.editorState.getCurrentContent()));
    testimonial.description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({ testimonial });
    this.props.actions.saveTestimonial(this.state.testimonial);
    this.context.router.push('/YogaThurles/Testimonials');
  }

  deleteTestimonial(event) {
    this.props.actions.deleteTestimonial(this.state.testimonial.id);
    this.props.actions.loadTestimonial();
    this.context.router.push('/YogaThurles/Testimonials');
  }

  render() {
    const {testimonial} = this.props;
    
    let testimonialImg = testimonial.image != "" ? require(`../../images/${testimonial.image}`) : ""

    const testimonialImage = {
      backgroundImage: 'url(' + testimonialImg + ')',
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover"
    }

    return (
      <TestimonialForm
        updateTestimonialState={this.updateTestimonialState}
        onChange={this.onChange}
        saveTestimonial={this.saveTestimonial}
        testimonial={this.state.testimonial}
        testimonialImage={testimonialImage}
        editorState={this.state.editorState}
        ref="editor"
        focus={focus}
        errors={this.state.errors}
        saving={this.state.saving}
        deleteTestimonial={this.deleteTestimonial}
        />
    );
  }
}

ManageTestimonialPage.propTypes = {
  testimonial: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  editorState: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  upload: PropTypes.object.isRequired,
  entityKey: PropTypes.object.isRequired,
};

ManageTestimonialPage.contextTypes = {
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


function getTestimonialById(testimonials, id) {
  const testimonial = testimonials.filter(testimonial => testimonial.id == id);
  if (testimonial.length) {
    return testimonial[0];
  }

  return null;
}

function mapStateToProps(state, ownProps) {
  const testimonialId = ownProps.params.id;
  let testimonial = { id: '', title: '', image: '', short: '', description: '', href: '', route: '', component: '' };
  if (testimonialId && state.testimonials.length > 0) {
    testimonial = getTestimonialById(state.testimonials, testimonialId);
  }

  return {
    testimonial: testimonial
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(testimonialActions, dispatch),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageTestimonialPage);
