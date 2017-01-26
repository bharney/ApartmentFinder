import React, { PropTypes } from 'react';
import { IndexLink, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from '../../actions/blogActions';
import {
    CompositeDecorator,
    ContentBlock,
    ContentState,
    EditorState,
    Entity,
    convertFromHTML,
    convertToRaw,
    convertFromRaw,
    RichUtils,
} from 'draft-js';
import {
  Editor,
  createEditorState,
} from 'medium-draft';

class BlogEditorPage extends React.Component {
    constructor(props, context) {
        super(props, context);
       
        const sampleMarkup =
            `<div className="mdl-card mdl-shadow--4dp tile">
                        <div className="mdl-card__title">
                            <div className="mdl-card__title-text">
                                <section className="text-center">
                                    <h2 id="name"></h2>
                                </section>
                            </div>
                        </div>
                        <div className="mdl-card__media bright-bg-color">
                            <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                                <img width="200" id="image" src="{require('./images/landing.jpg'}" />
                            </div>
                        </div>
                        <div className="mdl-card__supporting-text">
                            <p className="dark-color" id="description" ></p>
                            <a href="http://www.facebook.com">Example link</a><br /><br/ >
                        </div>
                    </div>`;
       
        this.state = {
            blog: Object.assign({}, props.blog),
            editorState: createEditorState()
        };
        this.makeBold = this.makeBold.bind(this);
        this.focus = this.focus.bind(this);
        this.onChange = this.onChange.bind(this);
        this.logState = this.logState.bind(this);

    }
    focus() {
        this.refs.editor.focus();
    }

    onChange(editorState) {
        this.setState({ editorState })
    };

    logState() {
        const content = this.state.editorState.getCurrentContent();
        console.log(convertToRaw(content));
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.blog.id != nextProps.blog.id) {
            debugger;
            this.setState({ editorState: createEditorState(convertFromRaw(nextProps.blog)) });
        }
    }

    makeBold() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));
    }


    render() {
        const { editorState } = this.state;
        const { blog } = this.props;
        const raw = convertToRaw(this.state.editorState.getCurrentContent());
        return (
            <div className="container-fluid m-t-40">
                <div className="row">
                    <div className="col-xs-offset-1 col-xs-10">
                        <button className="btn btn-primary" onClick={this.makeBold}><strong>B</strong></button>
                    </div>
                    <div className="col-xs-offset-1 col-xs-10" onClick={this.focus}>

                        <Editor
                            ref="editor"
                            editorState={editorState}
                            className="color-blur"
                            onChange={this.onChange}
                            />
                    </div>
                    {JSON.stringify(raw)}
                    <input
                        onClick={this.logState}
                        type="button"
                        value="Log State"
                        />
                </div>
            </div>
        );
    }
}

BlogEditorPage.propTypes = {
    editorState: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

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

export default connect(mapStateToProps, mapDispatchToProps)(BlogEditorPage);







// import React, { PropTypes } from 'react';
// import { Link, IndexLink, browserHistory } from 'react-router';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as blogActions from '../../actions/blogActions';
// import { ContentState, convertFromRaw } from 'draft-js';
// import { Editor, createEditorState, EditorState  } from 'medium-draft';

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





