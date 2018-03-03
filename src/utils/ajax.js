
class Ajax {

    static post(route, payload) {
        return sendRequest('POST', route, payload);
    }

    static get(route) {
        return sendRequest('GET', route);
    }
}

function sendRequest(type, route, payload) {
    payload = payload ? JSON.stringify(payload) : '';

    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
        xhr.open(type, route);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('accept', 'application/json');
        xhr.onload = function() {
            if (xhr.status !== 200) {
                return reject(xhr.responseText);
            }

            if (xhr.response) {
                resolve(JSON.parse(xhr.response));
            }
        };
        xhr.send(payload ? payload : null);
    });
}

export default Ajax