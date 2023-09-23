import * as Request from "./Request";

const get = (key, def = false) => {
    let value = localStorage.getItem(key);

    if(value === 'undefined' || !value){
        return def;
    }
    return JSON.parse(value);
};

const collection = (key, def = false) => {
	let collection = [];

    let value = localStorage.getItem(key);
    if(value === 'undefined' || !value){
        return def;
    }

    value = JSON.parse(value);
	Object.keys(value).forEach((key) => collection.push(value[key]));

    return collection;
};

const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const remove = (key) => {
    localStorage.removeItem(key);
};

const clear = () => {
    localStorage.clear();
};

const update = async () => {
	return await Request.get(`db`).then((result) => {
		if(result.success === true){
			Object.keys(result.data).forEach((key) => {
				save(key.toUpperCase(), result.data[key]);
			});
		}

		return result;
	});
};

export {
    get, save, remove, collection, clear, update
}
