
import * as Storage from "../Storage";
import * as Request from "../Request";
import * as Object from "../Object";


const current = () => {
	let user = Storage.get('USER', false);
    return new Object.User(user);
};

const get = async (id, props = false, controller = false) => {
    return await Request.get(`user/${id}`, props, controller).then((result) => {
        return result;
    });
};

const list = async (props, page = 1, controller = false) => {

	let url = `user/?iNumPage=${page}`;
	for (let key in props) {
		if(props.hasOwnProperty(key)){
			url += `&${key}=${props[key]}`
		}
	}

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};

const stats = async (props, page = 1, controller = false) => {

	let url = `user/${props.id}/stats/?nav=page-${page}`;

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};

const history = async (props, page = 1, controller = false) => {

	let url = `user/${props.id}/log/?nav=page-${page}`;

	return await Request.get(url, false, controller).then((result) => {
		return result;
	});
};

const login = async (props) => {
    return await Request.post(`token`, {
        LOGIN: props.LOGIN,
        PASSWORD: props.PASSWORD,
        UF_PUSH_TOKEN: false
    }).then((result) => {
        if(result.success === true){
	        result.data = (new Object.User()).format(result.data);
            Storage.save('USER', result.data);
            Storage.save('USER_ID', result.data?.ID);
            Storage.save('UF_TOKEN', result.data?.UF_TOKEN);
            Storage.save('UF_LOCATION', Number(result.data?.UF_LOCATION));
        }

        return result;
    });
};

const logout = async () => {

    return await Request.del(`token`, {}).then((result) => {
        if(result.success === true){
            localStorage.clear();
        }

        return result;
    });
};


export {
    get, list, current, login, logout, stats, history
}
