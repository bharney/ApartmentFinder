﻿import React, {PropTypes} from 'react';
import { Link } from 'react-router';


const Blog = ({blog}) => {
    return (
    <div className="col-xs-12 col-md-4 m-b-30">
        <div div className="mdl-card mdl-shadow--4dp bg-white tile">
            <div className="mdl-card__title">
                <div className="mdl-card__title-text">  
                    <section className="text-center">
                        <h2>{blog.title}</h2>
                    </section>
                </div>
            </div>
            <div className="mdl-card__media bright-bg-color">
                <div className="col-xs-offset-3 col-xs-7 p-t-20 p-b-20">
                    <img width="200" className="img-circle" src={blog.image} />
                </div>
            </div>
            <div className="mdl-card__supporting-text">
                <p className="dark-color">{blog.description}</p>
            </div>
            <div className="mdl-card__actions mdl-card--border">
                    <Link key={blog.route} to={'/' + blog.route + '/'+ blog.id} className="dark-color btn btn-default btn-block" activeClassName="active">Read More</Link>
            </div>
        </div>
    </div>
    );
};

Blog.propTypes = {
    blog: PropTypes.array.isRequired
};

export default Blog;