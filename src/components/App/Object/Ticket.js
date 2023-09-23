
import {Api, Object as Obj, Storage} from "../../App";


export class Ticket {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};

	car = new Obj.Car();
	necessitates;


	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}

		this.necessitates = Storage.get('NECESSITATE');
	}

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		this.nav.page = page;
		return Api.Ticket.list(props, page, controller).then(result => {
			if(result.status !== 204 && result.success === true){
				result.data.forEach(item => this.objects.push(this.format(item)));
				this.nav = {};
				this.nav.NEXT_PAGE = false;
			}
			return result.success;
		})
	};

	format = (json = this.object) => {
		let newJson = {
			CAR: {},
			NECESSITATES: []
		};

		Object.keys(json[0]).forEach(function(key, index, obj) {
			if(key.indexOf('CAR_') > -1){
				newJson.CAR[key.slice(4)] = json[0][key];
			}
		});
		newJson.CAR = this.car.format(newJson.CAR);

		json.forEach(item => {
			item.NECESSITATE_ID = Number(item.NECESSITATE_ID);
			item.DATE_CREATE = (item?.DATE_CREATE !== null) ? item?.DATE_CREATE : null;
			item.DATE_CREATE_FORMAT = new Date(item?.DATE_CREATE.replace(/-/g, "/"));
			item.NAME = this.necessitates[item.NECESSITATE_ID].NAME;
			item.DESCRIPTION = this.necessitates[item.NECESSITATE_ID].DESCRIPTION;
			item.AUTHOR_ID = (item?.AUTHOR_ID !== null) ? Number(item?.AUTHOR_ID) : null;
			item.AUTHOR_LAST_NAME = (item?.AUTHOR_LAST_NAME !== null) ? item?.AUTHOR_LAST_NAME : null;
			item.AUTHOR_NAME = (item?.AUTHOR_NAME !== null) ? item?.AUTHOR_NAME : null;
			item.RESPONSIBLE_ID = (item?.RESPONSIBLE_ID !== null) ? Number(item?.RESPONSIBLE_ID) : null;
			item.RESPONSIBLE_LAST_NAME = (item?.RESPONSIBLE_LAST_NAME !== null) ? item?.RESPONSIBLE_LAST_NAME : null;
			item.RESPONSIBLE_NAME = (item?.RESPONSIBLE_NAME !== null) ? item?.RESPONSIBLE_NAME : null;
			item.PERFORMER_ID = (item?.PERFORMER_ID !== null) ? Number(item?.PERFORMER_ID) : null;
			item.PERFORMER_LAST_NAME = (item?.PERFORMER_LAST_NAME !== null) ? item?.PERFORMER_LAST_NAME : null;
			item.PERFORMER_NAME = (item?.PERFORMER_NAME !== null) ? item?.PERFORMER_NAME : null;
			item.COMMENT = (item?.COMMENT !== null && item?.COMMENT !== '') ? item?.COMMENT : null;
			item.DATE_END = (item?.DATE_END !== null) ? item?.DATE_END : null;
			item.DATE_END_FORMAT = (item?.DATE_END !== null) ? new Date(item?.DATE_END.replace(/-/g, "/")) : null;

			newJson.NECESSITATES.push(item);
		});

		return newJson;
	};
}
