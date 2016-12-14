import {combineReducers} from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import navbar_items from './navbarReducer';
import blogs from './blogReducer'

const rootReducer = combineReducers({
  courses,
  authors,
  navbar_items,
  blogs
});

export default rootReducer;
