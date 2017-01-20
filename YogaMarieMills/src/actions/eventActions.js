import eventApi from '../API/mockEventApi';

export function loadEventSuccess(eventTypes) {
    return { type: 'LOAD_EVENT_SUCCESS', eventTypes};
}

export function loadEvent() {
    return function (dispatch) {
        return eventApi.getAllItems().then(eventTypes => {
            dispatch(loadEventSuccess(eventTypes));
    }).catch(error => {
      throw(error);
    });
  };
}
