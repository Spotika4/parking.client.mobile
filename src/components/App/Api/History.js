
import * as Request from "../Request";


const list = async (props, page = 1, controller = false) => {

	let url = `log/?nav=page-${page}`;
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
    list
}
