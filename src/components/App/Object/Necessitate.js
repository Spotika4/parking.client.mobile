
import { Api, Storage } from "../../App";


export class Necessitate {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};

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
		return Api.Necessitate.list(props, `all`, controller).then(result => {
			if(result.status !== 204 && result.success === true){
				result.data.forEach(item => this.objects.push(this.format(item)));
			}
			return result.success;
		});
	};

	collection = (active) => {
		let collection = [];
		let iterator = 0; let group = [];
		Object.keys(this.necessitates).forEach((key) => {
			let necessitate = this.necessitates[key];
			if(necessitate?.ACTIVE === 'Y'){
				iterator++;
				necessitate.ADDED = (active.hasOwnProperty(necessitate.ID));
				group.push(necessitate);

				if(iterator === 4){
					collection.push(group);
					group = []; iterator = 0;
				}
			}
		});

		return collection;
	};

	format = (json = this.object) => {

		json.ID =  Number(json.ID);
		json.ACTIVE =  (json.ACTIVE) ? json.ACTIVE : 'N';
		json.MAP_ID =  Number(json.MAP_ID);
		json.CAR_ID =  Number(json.CAR_ID);
		json.CAR_MAP_ID =  Number(json.CAR_MAP_ID);
		json.CAR_RESPONSIBLE_ID =  Number(json.CAR_RESPONSIBLE_ID);
		json.AUTHOR_ID =  Number(json.AUTHOR_ID);
		json.NECESSITATE_ID =  Number(json.NECESSITATE_ID);
		json.RESPONSIBLE_ID =  Number(json.RESPONSIBLE_ID);
		json.NAME =  json.NAME ?? this.necessitates[json.NECESSITATE_ID]?.NAME;
		json.DESCRIPTION =  json.DESCRIPTION ?? this.necessitates[json.NECESSITATE_ID]?.DESCRIPTION;
		json.AUTHOR_LAST_NAME = (json?.AUTHOR_LAST_NAME !== null) ? json?.AUTHOR_LAST_NAME : null;
		json.AUTHOR_NAME = (json?.AUTHOR_NAME !== null) ? json?.AUTHOR_NAME : null;
		json.RESPONSIBLE_ID = (json?.RESPONSIBLE_ID !== null) ? Number(json?.RESPONSIBLE_ID) : null;
		json.RESPONSIBLE_LAST_NAME = (json?.RESPONSIBLE_LAST_NAME !== null) ? json?.RESPONSIBLE_LAST_NAME : null;
		json.RESPONSIBLE_NAME = (json?.RESPONSIBLE_NAME !== null) ? json?.RESPONSIBLE_NAME : null;
		json.PERFORMER_ID = (json?.PERFORMER_ID !== null) ? Number(json?.PERFORMER_ID) : null;
		json.PERFORMER_LAST_NAME = (json?.PERFORMER_LAST_NAME !== null) ? json?.PERFORMER_LAST_NAME : null;
		json.PERFORMER_NAME = (json?.PERFORMER_NAME !== null) ? json?.PERFORMER_NAME : null;
		json.COMMENT = (json?.COMMENT !== null && json?.COMMENT !== '') ? json?.COMMENT : null;
		json.DATE_END = (json?.DATE_END !== null) ? json?.DATE_END : null;
		json.DATE_END_FORMAT = (json?.DATE_END !== null) ? new Date(json?.DATE_END.replace(/-/g, "/")) : null;
		json.DATE_CREATE = (json?.DATE_CREATE !== null) ? json?.DATE_CREATE : null;
		json.DATE_CREATE_FORMAT = (json?.DATE_CREATE !== null) ? new Date(json?.DATE_CREATE.replace(/-/g, "/")) : null;

		return json;
	};
}
