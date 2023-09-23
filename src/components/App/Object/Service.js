
import { Api, Storage } from "../";


export class Service {

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

	import = async (id) => {
		let SERVICES = Storage.get('SERVICE_MAP', false);
		if(SERVICES && SERVICES[id]){
			this.object = this.format(SERVICES[id]);
		}

		return this;
	};

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		this.nav.page = page;
		return Api.Service.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => this.objects.push(this.format(item)));
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	collection = () => {
		let object = Storage.get('SERVICE_MAP');
		let collection = Array();
		Object.keys(object).forEach((key) => {
			collection.push(this.format(object[key]))
		});
		return collection;
	};

	format = (json = this.object) => {

		json.ID =  Number(json.ID);
		json.MAP_ID =  Number(json.MAP_ID);
		json.ZONE_ID =  Number(json.ZONE_ID);
		json.CAR_TOTAL = (json?.CAR_TOTAL) ? Number(json.CAR_TOTAL) : 0;
		json.CAR_NECESSITATE_TOTAL = (json?.CAR_NECESSITATE_TOTAL) ? Number(json.CAR_NECESSITATE_TOTAL) : 0;

		json.CAR_NECESSITATE_STATE = 'warning';
		if(json.CAR_NECESSITATE_TOTAL === 0) json.CAR_NECESSITATE_STATE = `success`;
		if(json.CAR_NECESSITATE_TOTAL > 5) json.CAR_NECESSITATE_STATE = `danger`;

		return json;
	};
}
