import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import BlogPage from './components/blog/BlogPage';
import BlogEditorPage from './components/blog/BlogEditorPage';
import BlogsPage from './components/blog/BlogsPage';
import ManageBlogPage from './components/blog/ManageBlogPage';
import AboutPage from './components/about/AboutPage';
import YogaThurlesPage from './components/yogathurles/YogaThurlesPage';
import WhatToBringPage from './components/yogathurles/WhatToBringPage';
import ClassTypesPage from './components/yogathurles/ClassTypesPage';
import ClassTypePage from './components/yogathurles/ClassTypePage';
import CostPage from './components/cost/CostPage';
import DietConsultationPage from './components/contemporary/DietConsultationPage';
import MassagePage from './components/contemporary/MassagePage';
import EventPage from './components/events/EventPage';
import TestimonialPage from './components/contemporary/TestimonialPage';


export default (
    <Route path="/" history={browserHistory} component={App}>
        <IndexRoute component={HomePage} />
        <Route path="YogaThurles/Schedule" component={YogaThurlesPage} />
        <Route path="YogaThurles/Cost" component={CostPage} />
        <Route path="YogaThurles/WhatToBring" component={WhatToBringPage} />
        <Route path="YogaThurles/ClassTypes" component={ClassTypesPage} />
        <Route path="YogaThurles/ClassType/:id" component={ClassTypePage} />
        <Route path="Ayurveda/Massage/:id" component={MassagePage} />
        <Route path="Ayurveda/DietConsultation" component={DietConsultationPage} />
        <Route path="Ayurveda/Testimonials" component={TestimonialPage} />
        <Route path="Events/:id" component={EventPage} />
        <Route path="About" component={AboutPage} />
        <Route path="Blogs" component={BlogsPage} />
        <Route path="BlogEditor/:id" component={BlogEditorPage} />
        <Route path="Blog/:id" component={BlogPage} />
        <Route path="CreateBlog" component={ManageBlogPage} />
        <Route path="EditBlog/:id" component={ManageBlogPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="courses" component={CoursesPage} />
    </Route>
);
