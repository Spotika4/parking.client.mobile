
import * as Request from "../Request";


const post = async (id, props = false, controller = false) => {

	return await Request.post(`car/${id}/necessitate?`, props, controller).then((result) => {
		return result;
	});
};

const patch = async (id, props = false, controller = false) => {

	return await Request.patch(`car/${id}/necessitate?`, props, controller).then((result) => {
		return result;
	});
};

const list = async (props, page = 1, controller = false) => {

	let url = `car/${props.CAR_ID}/necessitate?nav=page-${page}`;
	for (let key in props) {
		if(props.hasOwnProperty(key) && props[key] !== null && props[key] !== ''){
			url += `&${key}=${props[key]}`
		}
	}

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};


export {
	post, list, patch
}
