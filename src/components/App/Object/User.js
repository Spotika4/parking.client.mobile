
import * as Request from "../Request";
import { Api, Storage } from "../../App";


export class User {

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

	load = async (id, props = false, controller = false) => {
		return Api.User.get(id, props, controller).then(result => {
			if(result.success === true){
				this.object = this.format(result.data);
			}
			return result.success;
		})
	};

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		return Api.User.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data.forEach(item => this.objects.push(this.format(item)));
				if(result.status === 204){
					this.nav.NEXT_PAGE = false;
				}else{
					this.nav.NEXT_PAGE = page + 1
				}
			}
			return result.success;
		})
	};

	import = () => {
		this.object = this.format(Storage.get('USER', false));
		return this;
	};

	location = async (id) => {
		return await Request.put(`location`, {ID: id}).then((result) => {
			if(result.success === true){
				this.object.UF_LOCATION = Number(id);
				Storage.save('USER', this.object);
			}

			return result.success;
		});
	};

	home = async (key) => {
		return await Request.put(`home`, { KEY: key }).then((result) => {
			if(result.success === true){
				this.object.UF_HOME = key;
				Storage.save('USER', this.object);
			}

			return result.success;
		});
	};

	format = (json) => {
		if(json === false) return json;

		if(json?.ID){
			json.ID = Number(json.ID);
		}

		json.ID = (json?.ID) ?? Number(json.ID);
		json.UF_HOME = (json?.UF_HOME) ?? `parking`;
		json.UF_LOCATION = (json?.UF_LOCATION) ?? Number(json.UF_LOCATION);
		json.UF_SERVICE = (json?.UF_SERVICE) ?? Number(json.UF_SERVICE);

		if(json?.ROLES){
			let temp = [];
			const ROLE = Storage.get('ROLE');
			Object.keys(json.ROLES).forEach(function(key) {
				if(ROLE[key]){
					temp.push(ROLE[key].NAME);
				}
			});
			json.ROLE = temp;
		}

		if(json?.UF_LOCATION){
			const MAP = Storage.get('MAP');
			json.MAP = MAP[json?.UF_LOCATION];
		}

		if(json?.UF_SERVICE){
			const SERVICE = Storage.get('SERVICE');
			json.SERVICE = SERVICE[json?.UF_SERVICE];
		}

		return json;
	};
}
