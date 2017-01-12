import dietConsultationApi from '../API/mockDietConsultationApi';

export function loadDietConsultationSuccess(dietConsultations) {
    return { type: 'LOAD_DIET_CONSULTATION_SUCCESS', dietConsultations};
}

export function loadDietConsultation() {
    return function (dispatch) {
        return dietConsultationApi.getAllItems().then(dietConsultations => {
            dispatch(loadDietConsultationSuccess(dietConsultations));
    }).catch(error => {
      throw(error);
    });
  };
}
