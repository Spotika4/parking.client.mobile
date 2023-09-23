
import * as Request from "../Request";

const del = async (id, props = false, controller = false) => {

	let url = `car/${id}/ignition`;

	return Request.del(url, props, controller).then((result) => {
		return result;
	});
};

const put = async (id, props = false, controller = false) => {

	let url = `car/${id}/ignition`;

	return Request.put(url, props, controller).then((result) => {
		return result;
	});
};


export {
    put, del
}
