import * as Storage from "./Storage";

const request = async (method, props = false, signal = false, requestMethod = 'GET') => {
    let token = Storage.get('UF_TOKEN', null);
    let domain = `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PATH}`;

    let settings = {
        method: requestMethod,
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'DB-VER': null,
            'UF-TOKEN': token
        })
    };

    if(signal !== false){
        settings.signal = signal.signal
    }

    if(props !== false && requestMethod !== 'GET' && requestMethod !== 'HEAD'){
        settings.body = JSON.stringify(props)
    }

    return fetch(domain + method, settings).then(function(result){

        if(result.status === 403 || result.status === 401){
            return { status: result.status, success: false, data: [] };
        }

        if(result.status === 204){
            return { status: result.status, success: true, data: [] };
        }

        return result.json();
    });
};

const get = async (method, props, signal = false) => {
    return request(method, props, signal, 'GET')
};

const post = async (method, props, signal = false) => {
    return request(method, props, signal, 'POST')
};

const patch = async (method, props, signal = false) => {
    return request(method, props, signal, 'PATCH')
};

const put = async (method, props, signal = false) => {
    return request(method, props, signal, 'PUT')
};

const del = async (method, props, signal = false) => {
    return request(method, props, signal, 'DELETE')
};

export {
    get, post, patch, put, del
}