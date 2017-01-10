import classTypesApi from '../API/mockClassTypesApi';

export function loadClassTypesSuccess(classTypes) {
  return { type: 'LOAD_CLASS_TYPES_SUCCESS', classTypes};
}

export function loadClassTypes() {
    return function (dispatch) {
      return classTypesApi.getAllClassTypes().then(classTypes => {
        dispatch(loadClassTypesSuccess(classTypes));
    }).catch(error => {
      throw(error);
    });
  };
}