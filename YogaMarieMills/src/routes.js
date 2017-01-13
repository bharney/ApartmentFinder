import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import CoursesPage from './components/course/CoursesPage';
import BlogPage from './components/blog/BlogPage';
import BlogsPage from './components/blog/BlogsPage';
import AboutPage from './components/about/AboutPage';
import YogaThurlesPage from './components/yogathurles/YogaThurlesPage';
import WhatToBringPage from './components/yogathurles/WhatToBringPage';
import ClassTypesPage from './components/yogathurles/ClassTypesPage';
import ClassTypePage from './components/yogathurles/ClassTypePage';
import CostPage from './components/cost/CostPage';
import DietConsultationPage from './components/contemporary/DietConsultationPage';
import BodyMassagePage from './components/contemporary/BodyMassagePage';
import ManageCoursePage from './components/course/ManageCoursePage';

export default (
    <Route path="/" history={browserHistory} component={App}>
        <IndexRoute component={HomePage} />
        <Route path="YogaThurles/Schedule" component={YogaThurlesPage} />
        <Route path="YogaThurles/Cost" component={CostPage} />
        <Route path="YogaThurles/WhatToBring" component={WhatToBringPage} />
        <Route path="YogaThurles/ClassTypes" component={ClassTypesPage} />
        <Route path="YogaThurles/ClassType/:id" component={ClassTypePage} />
        <Route path="Ayurveda/BodyMassage" component={BodyMassagePage} />
        <Route path="Ayurveda/DietConsultation" component={DietConsultationPage} />
        <Route path="About" component={AboutPage} />
        <Route path="Blogs" component={BlogsPage} />
        <Route path="Blog/:id" component={BlogPage} />
        <Route path="course" component={ManageCoursePage} />
        <Route path="course/:id" component={ManageCoursePage} />
        <Route path="courses" component={CoursesPage} />
    </Route>
);
