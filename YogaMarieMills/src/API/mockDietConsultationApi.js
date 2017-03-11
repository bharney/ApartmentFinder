class DietConsultationApi {
  static getAllItems() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:3000/api/consultations').then(function (response) {
        return response.json();
      }).then(function (consultations) {
        debugger;
        resolve(Object.assign([], consultations));
      });
    });
  }

  static saveCost(consultation) {
    consultation = Object.assign({}, consultation);
    return new Promise((resolve, reject) => {
      if (consultation.id) {
        fetch('http://localhost:3000/api/consultations', {
          method: 'put',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(consultation)
        }).then(function (response) {
          return response.json();
        }).then(function (consultation) {
          resolve(consultation)
        }).catch(function (error) {
          console.log('Request failed', error);
        });
      } else {
        fetch('http://localhost:3000/api/consultations', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(consultation)
        }).then(function (response) {
          return response.json();
        }).then(function (consultation) {
          resolve(consultation)
        }).catch(function (error) {
          console.log('Request failed', error);
        });
      }
    });
  }

  static deleteCost(consultationId) {
    return new Promise((resolve, reject) => {
      if (confirm("Are you sure you want to delete this consultation forever?")) {
        if (consultationId) {
          fetch('http://localhost:3000/api/consultations/' + consultationId, {
            method: 'delete'
          }).then(function (response) {
            resolve(console.log("consultation deleted."));
          }).catch(function (error) {
            console.log('Delete failed', error);
          });
        }
      }
    });
  }
}


export default DietConsultationApi;
