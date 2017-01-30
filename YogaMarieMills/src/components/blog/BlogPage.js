import React, { PropTypes } from 'react';
import { IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import { ItalicButton, BoldButton, UnderlineButton, HeadlineThreeButton, UnorderedListButton, BlockquoteButton } from 'draft-js-buttons';

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        Separator,
        HeadlineThreeButton,
        UnorderedListButton,
        BlockquoteButton,
    ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];

class BlogPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        const decorator = new CompositeDecorator([
            {
                strategy: findLinkEntities,
                component: Link,
            },
            {
                strategy: findBlogTitleEntities,
                component: BlogTitle,
            }
        ]);

        const sampleMarkup =
            `<div id="title" className="mdl-card__title">
                    <div className="mdl-card__title-text">
                        <section className="text-center">
                            <div>${props.blog.title}</div>
                        </section>
                    </div>
                 </div>
                 <div id="image" className="mdl-card__media bright-bg-color">
                    <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                        <img width="200"  src={${props.blog.image}} />
                    </div>
                 </div>
                 <div id="description" className="mdl-card__supporting-text">
                    <p className="dark-color" >${props.blog.description}</p>
                    <a href="http://www.facebook.com">Example link</a><br /><br/ >
                 </div>`;

        const blocksFromHTML = convertFromHTML(sampleMarkup);
        const state = ContentState.createFromBlockArray(blocksFromHTML);

        this.state = {
            blog: Object.assign({}, props.blog),
            editorState: EditorState.createWithContent(
                state,
                decorator,
            ),
        };

        this.onChange = this.onChange.bind(this);
        this.focus = this.focus.bind(this);
    }

    onChange(editorState) {
        this.setState({ editorState })
    };

    focus() {
        this.editor.focus();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.blog.id != nextProps.blog.id) {
            this.setState({ blog: Object.assign({}, nextProps.blog) });

            const sampleMarkup =
                `<div id="title" className="mdl-card__title">
                    <div className="mdl-card__title-text">
                        <section className="text-center">
                            <div>${nextProps.blog.title}</div>
                        </section>
                    </div>
                 </div>
                 <div id="image" className="mdl-card__media bright-bg-color">
                    <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                        <img width="200"  src={${nextProps.blog.image}} />
                    </div>
                 </div>
                 <div id="description" className="mdl-card__supporting-text">
                    <p className="dark-color" >${nextProps.blog.description}</p>
                    <a href="http://www.facebook.com">Example link</a><br /><br/ >
                 </div>`;

            const blocksFromHTML = convertFromHTML(sampleMarkup);
            const contentState = ContentState.createFromBlockArray(blocksFromHTML);
            const editorState = EditorState.push(this.state.editorState, contentState);
            this.setState({ editorState });
        }
    }



    render() {
        const { editorState } = this.state;
        const { blog } = this.props;

        return (
            <div className="container-fluid m-t-40">
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-10 m-t-40">
                        <div className="mdl-card mdl-shadow--4dp tile p-20">
                            <div id="editor" className="editor" onClick={this.focus}>
                                <Editor
                                    editorState={editorState}
                                    className="color-blur"
                                    onChange={this.onChange}
                                    plugins={plugins}
                                    ref={(element) => { this.editor = element; } }
                                    />
                                <InlineToolbar />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BlogPage.propTypes = {
    editorState: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link = (props) => {
    const {url} = Entity.get(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};

function findBlogTitleEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'TITLE'
            );
        },
        callback
    );
}

const BlogTitle = (props) => {
    const {blogTitle} = Entity.get(props.entityKey).getData();

    return (
        <div id={blogTitle}>
            {props.children}
        </div>
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

