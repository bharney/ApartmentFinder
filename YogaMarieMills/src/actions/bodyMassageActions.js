import bodyMassageApi from '../API/mockBodyMassageApi';

export function loadBodyMassageSuccess(bodyMassageTypes) {
    return { type: 'LOAD_BODY_MASSAGE_SUCCESS', bodyMassageTypes};
}

export function loadBodyMassage() {
    return function (dispatch) {
        return bodyMassageApi.getAllItems().then(bodyMassageTypes => {
            dispatch(loadBodyMassageSuccess(bodyMassageTypes));
    }).catch(error => {
      throw(error);
    });
  };
}
