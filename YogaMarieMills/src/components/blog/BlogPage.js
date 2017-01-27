import React, { PropTypes } from 'react';
import { IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import { CompositeDecorator, ContentBlock, ContentState, EditorState, Entity, convertFromHTML, convertToRaw, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import { ItalicButton, BoldButton, UnderlineButton, HeadlineTwoButton, HeadlineThreeButton, UnorderedListButton, OrderedListButton, BlockquoteButton } from 'draft-js-buttons';

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        Separator,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
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
                strategy: findBlogNameEntities,
                component: BlogName,
            }
        ]);

        const sampleMarkup =
            `<div id="name" className="mdl-card__title">
                    <div className="mdl-card__title-text">
                        <section className="text-center">
                            <div>${props.blog.name}</div>
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
                `<div id="name" className="mdl-card__title">
                    <div className="mdl-card__title-text">
                        <section className="text-center">
                            <div>${nextProps.blog.name}</div>
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
                            <div className="editor" onClick={this.focus}>
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

function findBlogNameEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'NAME'
            );
        },
        callback
    );
}

const BlogName = (props) => {
    const {blogName} = Entity.get(props.entityKey).getData();

    return (
        <div id={blogName}>
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
    let blog = { id: '', name: '', image: '', description: '', href: '', route: '', component: '' };
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







// import React, {PropTypes} from 'react';
// import {Link, IndexLink, browserHistory } from 'react-router';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as blogActions from '../../actions/blogActions';
// import {ContentState, convertFromRaw } from 'draft-js';
// import {Editor, createEditorState, EditorState  } from 'medium-draft';

// class BlogPage extends React.Component {
//     constructor(props, context) {
//         super(props, context);
//         const key = Entity.create('NAME', 'MUTABLE', {blogName: ''});
//         const contentStateWithName = Modifier.applyEntity(
//             contentState,
//             selectionState,
//             entityKey
//         );

//         this.state = {
//             editorState: createEditorState()
//         }

//         this.blockButtons = [
//             {
//                 label: 'H2',
//                 style: 'header-two',
//                 icon: 'header',
//                 description: 'Heading 2',
//             },
//             {
//                 label: 'H3',
//                 style: 'header-three',
//                 icon: 'header',
//                 description: 'Heading 3',
//             },
//             {
//                 label: 'Q',
//                 style: 'blockquote',
//                 icon: 'quote-right',
//                 description: 'Blockquote',
//             }]

//         this.onChange = (editorState) => {
//             this.setState({ editorState });
//         };
//     }

//     componentWillReceiveProps(nextProps) {
//         if (this.props.blog.id != nextProps.blog.id) {

//             debugger;
//             const content = ContentState.createFromText(nextProps.blog.name || '')
//             const editorState = createEditorState(content)
//             this.setState({editorState})
//         }
//     }

//     componentDidMount() {
//         this.refs.editor.focus();
//     }

//     render() {
//         const { editorState } = this.state;
//         debugger;
//         return (
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-xs-offset-1 col-xs-10">
//                         <Editor
//                             ref="editor"
//                             editorState={editorState}
//                             className="color-blur"
//                             onChange={this.onChange}
//                             blockButtons={this.blockButtons} />
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }


// BlogPage.propTypes = {
//     editorState: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// }


// function getBlogById(blogs, id) {
//     const blog = blogs.filter(blog => blog.id == id);
//     if (blog.length) {
//         return blog[0];
//     }

//     return null;
// }

// function mapStateToProps(state, ownProps) {
//     const blogId = ownProps.params.id;
//     let blog = { id: '', name: '', image: '', description: '', href: '', route: '', component: '' };
//     if (blogId && state.blogs.length > 0) {
//         blog = getBlogById(state.blogs, blogId);
//     }

//     return {
//         blog: blog
//     };
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(blogActions, dispatch)
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(BlogPage);





