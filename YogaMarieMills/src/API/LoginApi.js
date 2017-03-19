import { setClient, unsetClient } from '../actions/clientActions';

class LoginApi {
    static loginReqest(login) {
        login = Object.assign({}, login);
        debugger;
        return new Promise((resolve, reject) => {
            debugger;
            if (login.email && login.password) {
                fetch('http://localhost:3000/api/logins', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(login)
                }).then(function (response) {
                    return response.json();
                }).then(function (login) {
                    debugger;
                    if (login) {
                        resolve(setClient(login))
                    }
                }).catch(function (error) {
                    console.log('Request failed', error);
                });
            }
        });
    }
}

export default LoginApi;