import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import BlogPage from './components/blog/BlogPage';
import Blog from './components/blog/Blog';
import AboutPage from './components/about/AboutPage';
import YogaThurlesPage from './components/yogathurles/YogaThurlesPage';
import ContemporaryPage from './components/contemporary/ContemporaryPage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
    <Route path="/" history={browserHistory} component={App}>
        <IndexRoute component={HomePage} />
        <Route path="yogathurles" component={YogaThurlesPage} />
        <Route path="contemporary" component={ContemporaryPage} />
        <Route path="about" component={AboutPage} />
        <Route path="blog" component={BlogPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
    </Route>
);
