import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testimonialActions from '../../actions/testimonialActions';
import { CompositeDecorator, ContentBlock, ContentState, Editor, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';

class TestimonialPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        const decorator = new CompositeDecorator([
            {
                strategy: getEntityStrategy('MUTABLE'),
                component: TokenSpan,
            },
        ]);
    }

    render() {
        const { testimonials } = this.props;

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing">
                    <div className="container-fluid">
                        <div className="row m-t-30 m-b-30">
                            <div className="col-xs-offset-1 col-xs-10 m-b-30">
                                <h1 className="color-white text-center">{testimonials.header}</h1>
                                <h3 className="color-white text-center">{testimonials.short}</h3>
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp p-20">
                                        <div id="editor" className="editor">
                                            <p>
                                                <Editor
                                                    editorState={EditorState.createWithContent(
                                                        testimonials.description ? convertFromRaw(JSON.parse(testimonials.description))
                                                            : convertFromRaw({ blocks: [{ text: '', type: 'unstyled', },], entityMap: { first: { type: 'TOKEN', mutability: 'MUTABLE', }, } }),
                                                        this.decorator,
                                                    )}
                                                    readOnly={true}
                                                    ref="editor"
                                                />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-2-masonry">
                                        {testimonials.testimonial_details.map(testimonial_details =>
                                            <div className="mdl-card mdl-shadow--4dp p-20 m-t-30 tile-masonry bg-color-white">
                                                <ul className="mdl-list">
                                                    <li>
                                                        <blockquote>{testimonial_details.testimonial}</blockquote>
                                                        <p>{testimonial_details.name}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
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

TestimonialPage.propTypes = {
    testimonials: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
    return {
        testimonials: state.testimonials
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(testimonialActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TestimonialPage);