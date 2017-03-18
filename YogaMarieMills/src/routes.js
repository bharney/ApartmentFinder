import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import ManageCoursePage from './components/course/ManageCoursePage';
import BlogPage from './components/blog/BlogPage';
import BlogsPage from './components/blog/BlogsPage';
import ManageBlogPage from './components/blog/ManageBlogPage';
import AboutPage from './components/about/AboutPage';
import YogaThurlesPage from './components/yogathurles/YogaThurlesPage';
import ManageSchedulePage from './components/yogathurles/ManageSchedulePage';
import WhatToBringPage from './components/yogathurles/WhatToBringPage';
import ClassTypesPage from './components/yogathurles/ClassTypesPage';
import ClassTypePage from './components/yogathurles/ClassTypePage';
import ManageClassTypePage from './components/yogathurles/ManageClassTypePage';
import ManageCostPage from './components/cost/ManageCostPage';
import CostsPage from './components/cost/CostsPage';
import DietConsultationPage from './components/contemporary/DietConsultationPage';
import ManageDietConsultationPage from './components/contemporary/ManageDietConsultationPage';
import MassagePage from './components/contemporary/MassagePage';
import ManageMassagePage from './components/contemporary/ManageMassagePage';
import ManageEventPage from './components/events/ManageEventPage';
import EventPage from './components/events/EventPage';
import TestimonialPage from './components/contemporary/TestimonialPage';
import ManageTestimonialPage from './components/contemporary/ManageTestimonialPage';
import ManageLoginPage from './components/login/ManageLoginPage';

export default (
    <Route path="/" history={browserHistory} component={App}>
        <IndexRoute component={HomePage} />
        <Route path="Login" component={ManageLoginPage} />
        <Route path="YogaThurles/Schedule" component={YogaThurlesPage} />
        <Route path="Schedule/:id" component={ManageSchedulePage} />
        <Route path="Schedule" component={ManageSchedulePage} />
        <Route path="Cost/:id" component={ManageCostPage} />
        <Route path="Cost" component={ManageCostPage} />
        <Route path="YogaThurles/Costs" component={CostsPage} />
        <Route path="YogaThurles/WhatToBring" component={WhatToBringPage} />
        <Route path="YogaThurles/ClassType/:id" component={ClassTypePage} />
        <Route path="ClassType/:id" component={ManageClassTypePage} />
        <Route path="ClassType" component={ManageClassTypePage} />
        <Route path="YogaThurles/ClassTypes" component={ClassTypesPage} />
        <Route path="Massage/:type/:id" component={ManageMassagePage} />
        <Route path="Massage/:type" component={ManageMassagePage} />
        <Route path="Ayurveda/Massage/:id" component={MassagePage} />
        <Route path="Ayurveda/DietConsultation" component={DietConsultationPage} />
        <Route path="DietConsultation" component={ManageDietConsultationPage} />
        <Route path="Ayurveda/Testimonials" component={TestimonialPage} />
        <Route path="Testimonials" component={ManageTestimonialPage} />
        <Route path="Admin/Events/:id" component={ManageEventPage} />
        <Route path="Admin/Events" component={ManageEventPage} />
        <Route path="Events/:id" component={EventPage} />
        <Route path="About" component={AboutPage} />
        <Route path="Blogs" component={BlogsPage} />
        <Route path="Blog/:id" component={BlogPage} />
        <Route path="Admin/Blog/:id" component={ManageBlogPage} />
        <Route path="Admin/Blog" component={ManageBlogPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="courses" component={CoursesPage} />
    </Route>
);
