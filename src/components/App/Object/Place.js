
import { Api, Storage } from "../index";
import { Object as Obj } from "../../App";


export class Place {

	object = {};
	sector = Storage.get('SECTOR');


	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}
		this.sector = Storage.get('SECTOR');
	}

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		return Api.Place.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => this.objects.push(this.format(item)));
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	format = (json) => {

		json.CAR = false;
		json.ID =  Number(json.ID);
		json.INNER_ID =  Number(json.INNER_ID);
		json.SECTOR_ID =  Number(json.SECTOR_ID);
		json.CAR_ID = (json?.CAR_ID) ? Number(json.CAR_ID) : null;
		json.NECESSITATE_TOTAL = (json?.NECESSITATE_TOTAL) ? Number(json.NECESSITATE_TOTAL) : 0;
		json.LOCATION = {
			title: `Сектор ${this.sector[json.SECTOR_ID].NAME}, место ${json.INNER_ID}`,
			icon: 'my_location'
		};

		if(json.CAR_ID !== null){
			json.CAR = {};
			let car = new Obj.Car();
			Object.keys(json).forEach(function(key, index, obj) {
				if(key.indexOf('CAR_') > -1){
					json.CAR[key.slice(4)] = json[key];
				}
			});
			json.CAR = car.format(json.CAR);
		}

		return json;
	};
}
