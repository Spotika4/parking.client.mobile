
import { Api } from "../";


export class Dcard {

	controller;

	object = {};
	objects = {};

	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}
	}

	get = async (id, props = false, controller = false) => {
		return Api.Dcard.get(id, props, controller).then(result => {
			if(result.success === true){
				this.object = this.format(result.data);
			}
			return result.success;
		})
	};

	format = (json = this.object) => {

		let format = [];
		json.forEach(item => {
			let block = item;

			block.name =  (item?.name) ? item.name : null;
			block.blockList =  (item?.blockList) ? item.blockList : [];

			format.push(block);
		});

		return format;
	};
}
