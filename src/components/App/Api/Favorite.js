
import * as Request from "../Request";


const put = async (car_id) => {

	return await Request.put(`favorite`, {
		CAR_ID: car_id
	}).then((result) => {
		if (result.success === true) {
			return result;
		}
	});
};

const get = async () => {

	return await Request.get(`favorite`).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};

const del = async (car_id) => {

	return await Request.del(`favorite`).then((result) => {
		if (result.success === true) {
			return result.data;
		}
		return false;
	});
};

export { put, get, del }
