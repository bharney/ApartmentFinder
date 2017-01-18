import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import navbar_items from './navbarReducer';
import blogs from './blogReducer';
import schedules from './scheduleReducer';
import costs from './costReducer';
import classTypes from './classTypesReducer';
import dietConsultations from './dietConsultationReducer';
import massageTypes from './massageReducer';
import testimonials from './testimonialReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  navbar_items,
  blogs,
  schedules,
  costs,
  classTypes,
  dietConsultations,
  massageTypes,
  testimonials,
});

export default rootReducer;
