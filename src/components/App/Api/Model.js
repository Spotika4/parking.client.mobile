
import * as Request from "../Request";


const get = async (id, props = false, controller = false) => {
	return await Request.get(`model/${id}`, props, controller).then((result) => {
		return result;
	});
};

const list = async (props, page = 1, controller = false) => {

	let url = `model/?nav=page-${page}`;
	for (let key in props) {
		if(props.hasOwnProperty(key)){
			url += `&${key}=${props[key]}`
		}
	}

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};


export {
	get, list
}
