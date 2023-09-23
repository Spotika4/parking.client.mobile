
import { Api } from "../";


export class Autoteca {

	controller;

	object = {};
	objects = {};

	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}
	}

	get = async (id, props = false, controller = false) => {
		return Api.Autoteca.get(id, props, controller).then(result => {
			if(result.success === true){
				this.object = this.format(result.data);
			}
			return result.success;
		})
	};

	getByAvito = async (id, props = false, controller = false) => {
		return Api.Autoteca.get(id, props, controller).then(result => {
			if(result.success === true){
				this.object = this.format(result.data);
			}
			return result.success;
		})
	};

	format = (json = this.object) => {
		json.data.ownersHistory.items.reduce((acc, item)=> ({...acc, [item]: item}) , {});

		return json;
	};
}
