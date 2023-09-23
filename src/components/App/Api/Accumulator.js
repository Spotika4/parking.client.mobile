
import * as Request from "../Request";

const put = async (id, props = false, controller = false) => {

	let url = `car/${id}/accumulator`;

	return Request.put(url, props, controller).then((result) => {
		return result;
	});
};


export {
    put
}
