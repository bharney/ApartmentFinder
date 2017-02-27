
class UploadApi {
    static uploadFile(file) {
        let data = new FormData()
        data.append('file', file)
        return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/api/uploads', {
                method: 'post',
                body: data
            }).then(function (response) {
                resolve(response)
            }).catch(function (error) {
                console.log('Request failed', error);
            });
        });
    }
}

export default UploadApi;