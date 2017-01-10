import initialState from './initialState';

export default function classTypesReducer(state = initialState.classTypes, action) {
  switch (action.type) {
    case 'LOAD_CLASS_TYPES_SUCCESS':
      return action.classTypes;

    default:
      return state;
  }
}
