
import * as Request from "../Request";


const get = async (props) => {
    return await Request.get(`sector/${props.id}`).then((result) => {
        return result;
    });
};

const list = async (props, page = 1, controller = false) => {

	let url = `sector/?nav=page-${page}`;
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
