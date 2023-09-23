
import * as Request from "../Request";


export const barcode = async (car_id, props = false, controller) => {
	return await Request.get(`car/${car_id}/barcode?`, props, controller).then((result) => {
		result.ORIGINAL = (result.hasOwnProperty('ORIGINAL')) ? result.ORIGINAL : false;
		return result;
	});
};

export const get = async (car_id, props = false, controller) => {
	return await Request.get(`car/${car_id}/reserve?`, props, controller).then((result) => {
		result.ORIGINAL = (result.hasOwnProperty('ORIGINAL')) ? result.ORIGINAL : false;
		return result;
	});
};

export const del = async (car_id, props = false, controller) => {
	return await Request.del(`car/${car_id}/reserve?`, props, controller).then((result) => {
		result.ORIGINAL = (result.hasOwnProperty('ORIGINAL')) ? result.ORIGINAL : false;
		return result;
	});
};

export const post = async (car_id, props = false, controller) => {
	return await Request.post(`car/${car_id}/reserve?`, props, controller).then((result) => {
		result.ORIGINAL = (result.hasOwnProperty('ORIGINAL')) ? result.ORIGINAL : false;
		return result;
	});
};

export const put = async (car_id, props = false, controller) => {
	return await Request.put(`car/${car_id}/reserve?`, props, controller).then((result) => {
		result.ORIGINAL = (result.hasOwnProperty('ORIGINAL')) ? result.ORIGINAL : false;
		return result;
	});
};
