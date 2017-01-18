import massageApi from '../API/mockMassageApi';

export function loadMassageSuccess(massageTypes) {
    return { type: 'LOAD_MASSAGE_SUCCESS', massageTypes};
}

export function loadMassage() {
    return function (dispatch) {
        return massageApi.getAllItems().then(massageTypes => {
            dispatch(loadMassageSuccess(massageTypes));
    }).catch(error => {
      throw(error);
    });
  };
}
