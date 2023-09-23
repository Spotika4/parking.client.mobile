
import { Api } from "../../App";


export class Transmission {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};


	constructor(json = false){
		this.places = [];
		if(json !== false){
			this.object = this.format(json);
		}
	}

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		this.nav.page = page;
		return Api.Transmission.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => this.objects.push(this.format(item)));
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	format = (json = this.object) => {

		json.ID =  Number(json.ID);

		return json;
	};
}
