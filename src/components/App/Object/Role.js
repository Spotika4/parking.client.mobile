
import { Storage } from "../../App";


export class Role {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};


	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}
	}

	collection = () => {
		let object = Storage.get('ROLE');
		let collection = Array();
		Object.keys(object).forEach((key) => {
			collection.push(this.format(object[key]))
		});
		return collection;
	};

	format = (json = this.object) => {

		json.ID =  Number(json.ID);

		return json;
	};
}
