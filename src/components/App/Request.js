import * as Storage from "./Storage";

const request = async (method, props = false, signal = false, requestMethod = 'GET') => {
    let token = Storage.get('UF_TOKEN', null);
    let db_ver = Storage.get('DB_VER', null);
    let domain = `${process.env.REACT_APP_PROTOCOL}${process.env.REACT_APP_DOMAIN}${process.env.REACT_APP_PATH}`;

    let settings = {
        method: requestMethod,
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'DB-VER': db_ver,
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

	    if(result.status === 204){
		    return { status: result.status, success: true, data: [] };
	    }

	    if(result.status === 401){
		    localStorage.clear();
		    window.location.reload(true);
	    }

        if(result.status === 403){
            return { status: result.status, success: false, data: [] };
        }

	    if(result.status === 404){
		    // window.dispatchEvent(new CustomEvent(`app.stick`, { detail: { show: true, text: `${result.status}: ${result.statusText}` } }));
		    return { status: result.status, success: false, data: [] };
	    }

	    if(result.status === 426){
		    window.dispatchEvent(new CustomEvent(`app.update`));
		    window.dispatchEvent(new CustomEvent(`app.stick`, { detail: { text: `Необходимо обновить кеш базы данных сервера` } }));
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
