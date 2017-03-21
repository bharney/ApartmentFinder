/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCourses} from './actions/courseActions';
import {loadAuthors} from './actions/authorActions';
import {loadNavbar} from './actions/navbarActions';
import {loadBlog} from './actions/blogActions';
import {loadSchedule} from './actions/scheduleActions';
import {loadCost} from './actions/costActions';
import {loadClassTypes} from './actions/classTypesActions';
import {loadDietConsultation} from './actions/dietConsultationActions';
import {loadMassage} from './actions/massageActions';
import {loadEvent} from './actions/eventActions';
import {loadTestimonial} from './actions/testimonialActions';
import {authenticate} from './actions/authTokenActions';
import MuiThemeProvider from '../node_modules/material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../node_modules/draft-js-inline-toolbar-plugin/lib/plugin.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/material-design-lite/material.js';
import '../node_modules/material-design-lite/material.css';
import './styles/styles.scss';

injectTapEventPlugin();

const store = configureStore();
store.dispatch(loadCourses());
store.dispatch(loadAuthors());
store.dispatch(loadNavbar());
store.dispatch(loadBlog());
store.dispatch(loadSchedule());
store.dispatch(loadCost());
store.dispatch(loadClassTypes());
store.dispatch(loadDietConsultation());
store.dispatch(loadMassage());
store.dispatch(loadTestimonial());
store.dispatch(loadEvent());
store.dispatch(loadCourses());
store.dispatch(authenticate());

render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
   </MuiThemeProvider>,
  document.getElementById('app')

);
