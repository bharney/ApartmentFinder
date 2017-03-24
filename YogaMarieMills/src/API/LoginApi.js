class LoginApi {
    static loginRequest(login) {
        login = Object.assign({}, login);
        debugger;
        return new Promise((resolve, reject) => {
            debugger;
            if (login.emailAddress && login.password) {
                fetch('http://localhost:3000/api/login', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(login)
                }).then(function (response) {
                    debugger;
                    return response.json();
                }).then(function (login) {
                    debugger;
                    resolve(login);
                    debugger;
                }).catch(function (error) {
                    console.log('Request failed', error);
                });
            }
        });
    }
}

export default LoginApi;