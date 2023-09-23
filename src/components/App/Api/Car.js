
import * as Request from "../Request";


const get = async (id, props = false, controller = false) => {
    return await Request.get(`car/${id}`, props, controller).then((result) => {
        return result;
    });
};

const list = async (props, page = 1, controller = false) => {

	let url = `car/?nav=page-${page}`;
	for (let key in props) {
		if(props.hasOwnProperty(key) && props[key] !== null && props[key] !== ''){
			url += `&${key}=${props[key]}`
		}
	}

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};

const history = async (id, page = 1, controller = false) => {

	let url = `car/${id}/log/?nav=page-${page}`;

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};

const demo = async (id, props = false, controller = false) => {

	let url = `car/${id}/demo`;

	return Request.post(url, props, controller).then((result) => {
		return result;
	});
};


export {
    get, list, history, demo
}
