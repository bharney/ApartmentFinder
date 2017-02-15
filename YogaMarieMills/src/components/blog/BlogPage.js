import React, { PropTypes } from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, convertFromRaw, convertToRaw, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
} from 'draft-js-buttons';

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
    ]
});

const plugins = [inlineToolbarPlugin];

const { InlineToolbar } = inlineToolbarPlugin;




class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        const decorator = new CompositeDecorator([
            {
                strategy: getEntityStrategy('MUTABLE'),
                component: TokenSpan,
            },
        ]);

        const blocks = convertFromRaw(JSON.parse(props.blog.description));

        this.state = {
            blog: Object.assign({}, props.blog),
            editorState: EditorState.createWithContent(
                blocks,
                decorator,
            ),
        };

        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
        this.saveBlog = this.saveBlog.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.blog.id != nextProps.blog.id) {
            this.setState({ blog: Object.assign({}, nextProps.blog) });
            const blocks = convertFromRaw(JSON.parse(nextProps.blog.description));
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

    saveBlog(event) {
        debugger;
        event.preventDefault();
        this.state.blog.description = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
        this.props.actions.saveBlog(this.state.blog);
        this.context.router.push('/blogs');
    }

    render() {
        const { editorState } = this.state;
        const { blog } = this.props;

        return (
            <div className="mdl-grid dark-color">
                <div className="ribbon bg-image-landing b-border">
                    <div className="container">
                        <div className="row m-b-30">
                            <div className="col-xs-12">
                                <h1 className="color-white text-center">{blog.title}</h1>
                                <hr />
                                <div className="col-xs-12 m-b-30">
                                    <div className="mdl-card mdl-shadow--4dp">
                                        <div className="mdl-card__media v-h-40 image-text-container">
                                            <div className="text-left align-bottom m-l-20 m-b-20">
                                                <header className="color-white">
                                                    <h4 className="m-t-0 m-b-0"><strong>{blog.short}</strong></h4>
                                                </header>
                                            </div>
                                        </div>
                                        <div className="col-xs-12 t-border-thin p-20">
                                            <div className="mdl-color-text--grey-700 col-xs-12 m-b-15">
                                                <div className="pull-left">
                                                    <p><strong>{blog.postDate} by <Link to="/about">Marie Mills</Link></strong></p>
                                                </div>
                                                <div className="pull-right">
                                                    <i className="glyphicon glyphicon-heart fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="glyphicon glyphicon-bookmark fa-lg" aria-hidden="true"></i> &nbsp;
                                                        <i className="fa fa-share-alt fa-lg" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <div className="col-xs-offset-1 col-xs-10">
                                                <div id="editor" className="editor" onClick={this.focus}>
                                                    <p>
                                                        <Editor
                                                            editorState={this.state.editorState}
                                                            onChange={this.onChange}
                                                            ref="editor"
                                                            plugins={plugins}
                                                            />
                                                        <InlineToolbar />
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-xs-offset-8 col-xs-2 col-lg-offset-8 col-lg-1">
                                                <button onClick={this.saveBlog} className="btn btn-success">
                                                    <span>Save &nbsp;<i className="glyphicon glyphicon-ok" aria-hidden="true"></i></span>
                                                </button>
                                            </div>
                                            <div className="col-xs-2 col-lg-1">
                                                <button className="btn btn-danger">
                                                    <span>Delete &nbsp;<i className="glyphicon glyphicon-remove" aria-hidden="true"></i></span>
                                                </button>
                                            </div>
                                        </div>
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

BlogPage.propTypes = {
    blog: PropTypes.object.isRequired,
    editorState: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    entityKey: PropTypes.object.isRequired,
};

BlogPage.contextTypes = {
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


function getBlogById(blogs, id) {
    const blog = blogs.filter(blog => blog.id == id);
    if (blog.length) {
        return blog[0];
    }

    return null;
}

function mapStateToProps(state, ownProps) {
    const blogId = ownProps.params.id;
    let blog = { id: '', title: '', image: '', description: '', href: '', route: '', component: '' };
    if (blogId && state.blogs.length > 0) {
        blog = getBlogById(state.blogs, blogId);
    }

    return {
        blog: blog
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);



