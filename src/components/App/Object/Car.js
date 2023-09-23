
import { Api, Storage, Object as Obj } from "../../App";


export class Car {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};

	user = {};
	map = [];
	status = [];
	sector = [];
	zone_map = [];
	service_map = [];
	sale_status = [];

	constructor(json = false){
		if(json !== false){
			this.object = this.format(json);
		}

		this.user = (new Obj.User()).import();
		this.map = Storage.get('MAP');
		this.status = Storage.get('STATUS');
		this.sector = Storage.get('SECTOR');
		this.zone_map = Storage.get('ZONE_MAP');
		this.service_map = Storage.get('SERVICE_MAP');
		this.sale_status = Storage.get('SALE_STATUS');
	}

	get = async (id, props = false, controller = false) => {
		return Api.Car.get(id, props, controller).then(result => {
			if(result.success === true){
				this.object = this.format(result.data);
			}
			return result.success;
		})
	};

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		this.nav.page = page;
		return Api.Car.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => this.objects.push(this.format(item)));
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	necessitatesList = (car_id, props = {}) => {
		let collection = Array();

		let model = new Obj.Necessitate();

		return model.list({ CAR_ID: car_id }).then(result => {
			if(result === true){
				Object.keys(model.objects).forEach((key) => {
					collection.push(model.format(model.objects[key]));
				});
			}

			return collection;
		});
	};

	necessitates = (car_id) => {

		let model = new Obj.Necessitate();

		return model.list({ CAR_ID: car_id }).then(result => {
			let collection = {
				all: [],
				added: [],
				blocked: [],
				collection: []
			};

			if(result === true){

				Object.keys(model.objects).forEach((key) => {
					let necessitate = model.objects[key];
					collection.all.push(necessitate);

					if(necessitate?.BLOCKED === true){
						collection.blocked.push(necessitate);
					}else{
						collection.added.push(necessitate);
					}
				});

				collection.collection = model.collection(collection.all);
			}

			return collection;
		});
	};

	favorite = (car_id) => {
		return Api.Favorite.put(car_id).then(result => {
			Storage.save('UF_FAVORITE', result.data[0]);
			this.object.IS_FAVORITE = (result.data?.length > 0) ? result.data.includes(car_id) : false;
		})
	};

	isFavorite = (id) => {
		let favorite = [];
		if(Storage.get('UF_FAVORITE').length > 0){
			Storage.get('UF_FAVORITE').forEach((id) => favorite.push(Number(id)));
		}
		return (favorite?.length > 0) ? favorite.includes(id) : false
	};

	demo = async (id) => {

		return new Promise((resolve, reject) => {
			Api.Car.demo(id).then(result => {
				resolve(result);
			});
		});
	};

	ignition = (id, ignition) => {

		return new Promise((resolve, reject) => {

			if(ignition === null){
				Api.Ignition.del(id).then(result => {
					result.data = this.format(result.data)
					resolve(result);
				});
			}else{
				Api.Ignition.put(id, { IGNITION_KEY: ignition }).then(result => {
					result.data = this.format(result.data)
					resolve(result);
				});
			}

		});
	};

	accumulator = (id, props = false) => {

		return new Promise((resolve, reject) => {

			Api.Accumulator.put(id, props).then(result => {
				resolve(result);
			});

		});
	};

	setStatus = (id, props = false) => {

		return new Promise((resolve, reject) => {

			Api.Status.put(id, props).then(result => {
				resolve(result);
			});

		});
	};

	format = (json = this.object) => {

		json.ID = (json?.NECESSITATE_TOTAL !== null) ? Number(json.ID) : null;
		//json.BLOCKED = Boolean(json.BLOCKED);
		json.LOG_UNBLOCKED_TOTAL = (json?.LOG_UNBLOCKED_TOTAL !== null) ? Number(json.LOG_UNBLOCKED_TOTAL) : null;
		json.BLOCKED = (Number(json.LOG_UNBLOCKED_TOTAL) <= 0);
		json.BRAND_NAME =  (json?.BRAND_NAME) ? json.BRAND_NAME : null;
		json.MODEL_NAME =  (json?.MODEL_NAME) ? json.MODEL_NAME : null;
		json.CAR_NAME = `${json.BRAND_NAME} ${json.MODEL_NAME}`;
		json.COLOR_ID = (json?.COLOR_ID !== null) ? Number(json.COLOR_ID) : null;
		json.PASSPORT_ID = (json?.PASSPORT_ID !== null) ? Number(json.PASSPORT_ID) : null;
		json.ENGINE_TYPE_ID = (json?.ENGINE_TYPE_ID !== null) ? Number(json.ENGINE_TYPE_ID) : null;
		json.ENGINE_HORSE = (json?.ENGINE_HORSE !== null) ? Number(json.ENGINE_HORSE) : null;
		json.ENGINE_VOLUME = (json?.ENGINE_VOLUME !== null) ? Number(json.ENGINE_VOLUME) : null;
		json.OWNERS = (json?.OWNERS !== null) ? Number(json.OWNERS) : null;
		json.YEAR = (json?.YEAR !== null) ? Number(json.YEAR) : null;
		json.RESPONSIBLE_ID = (json?.RESPONSIBLE_ID !== null) ? Number(json.RESPONSIBLE_ID) : null;
		json.CREDIT_DISCOUNT = (json?.CREDIT_DISCOUNT !== null) ? Number(json.CREDIT_DISCOUNT) : null;
		json.TRADE_IN_DISCOUNT = (json?.TRADE_IN_DISCOUNT !== null) ? Number(json.TRADE_IN_DISCOUNT) : null;
		json.INSURANCE_DISCOUNT = (json?.INSURANCE_DISCOUNT !== null) ? Number(json.INSURANCE_DISCOUNT) : null;
		json.MAX_DISCOUNT = (json?.MAX_DISCOUNT !== null) ? Number(json.MAX_DISCOUNT) : null;
		json.HIGH_PRICE = (json?.HIGH_PRICE !== null) ? Number(json.HIGH_PRICE) : null;
		json.PLACE_ID = (json?.PLACE_ID !== null) ? Number(json.PLACE_ID) : null;
		json.SERVICE_ID = (json?.SERVICE_ID !== null) ? Number(json.SERVICE_ID) : null;
		json.ZONE_ID = (json?.ZONE_ID !== null) ? Number(json.ZONE_ID) : null;
		json.INNER_ID = (json?.INNER_ID !== null) ? Number(json.INNER_ID) : null;
		json.STATUS_ID = (json?.STATUS_ID !== null) ? Number(json.STATUS_ID) : null;
		json.MAP_ID =  (json?.MAP_ID) ? Number(json.MAP_ID) : null;
		json.SECTOR_ID =  (json?.SECTOR_ID) ? Number(json.SECTOR_ID) : null;
		json.NECESSITATE_TOTAL =  (json?.NECESSITATE_TOTAL) ? Number(json.NECESSITATE_TOTAL) : 0;
		json.WORK_ORDER_TOTAL =  (json?.WORK_ORDER_TOTAL) ? Number(json.WORK_ORDER_TOTAL) : 0;
		json.ENGINE_TYPE_NAME =  (json?.ENGINE_TYPE_NAME) ? json.ENGINE_TYPE_NAME : null;
		json.TRANSMISSION_NAME =  (json?.TRANSMISSION_NAME) ? json.TRANSMISSION_NAME : null;
		json.PASSPORT_NAME =  (json?.PASSPORT_NAME) ? json.PASSPORT_NAME : null;
		json.BODY_NAME =  (json?.BODY_NAME) ? json.BODY_NAME : null;
		json.BODY_HASH =  (json?.BODY_HASH) ? json.BODY_HASH : `SEDAN`;
		json.COLOR_NAME =  (json?.COLOR_NAME) ? json.COLOR_NAME : null;
		json.COLOR_HASH =  (json?.COLOR_HASH) ? json.COLOR_HASH : `#ffffff`;

		json.NOTICE =  this.notice(json.NECESSITATE_TOTAL);
		json.IGNITION_KEY = (json.IGNITION_KEY === null) ? null: Number(json.IGNITION_KEY);
		json.IGNITION_NAME = (json.IGNITION_NAME === null) ? null: json.IGNITION_NAME;
		json.IGNITION_LAST_NAME = (json.IGNITION_LAST_NAME === null) ? null: json.IGNITION_LAST_NAME;
		json.ACCUMULATOR = (json.ACCUMULATOR === null) ? null: Number(json.ACCUMULATOR);

		json.STATUS_CODE =  (json?.STATUS_CODE) ? json.STATUS_CODE : null;
		json.LAST_STATUS_EVENT =  (json?.LAST_STATUS_EVENT) ? json.LAST_STATUS_EVENT : null;

		json.VIN_FORMAT = (json.VIN !== null) ? ([json.VIN.slice(0,3), json.VIN.slice(3,9), json.VIN.slice(9)]).join(' ') : null;
		json.G_NUMBER_FORMAT = (json.G_NUMBER !== null) ? ([json.G_NUMBER.slice(0,1), json.G_NUMBER.slice(1,4), json.G_NUMBER.slice(4,6), json.G_NUMBER.slice(6)]).join(' ') : null;

		json.PRICE = Number(json.PRICE);
		json.PRICE_FORMAT = (json.PRICE !== null) ? new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'}).format(json.PRICE).replace(/,00/g, '') : null;

		json.MILEAGE = Number(json.MILEAGE);
		json.MILEAGE_FORMAT = (json.MILEAGE !== null) ? new Intl.NumberFormat('ru-RU').format(json.MILEAGE) : null;

		json.LAST_STATUS_EVENT_LONG =  (json?.LAST_STATUS_EVENT_LONG) ? json.LAST_STATUS_EVENT_LONG : null;
		json.LAST_STATUS_EVENT_DATE_CREATE =  (json?.LAST_STATUS_EVENT_DATE_CREATE) ? json.LAST_STATUS_EVENT_DATE_CREATE : null;
		json.LAST_STATUS_EVENT_AUTHOR_NAME =  (json?.LAST_STATUS_EVENT_AUTHOR_NAME) ? json.LAST_STATUS_EVENT_AUTHOR_NAME : null;
		json.LAST_STATUS_EVENT_AUTHOR_LAST_NAME =  (json?.LAST_STATUS_EVENT_AUTHOR_LAST_NAME) ? json.LAST_STATUS_EVENT_AUTHOR_LAST_NAME : null;

		if(json?.LAST_STATUS_EVENT_DATE_CREATE !== null && (json?.STATUS_CODE === 'SERVICE' || json?.STATUS_CODE === 'ZONE')){
			json.LAST_STATUS_EVENT_LONG = this.timer(json?.LAST_STATUS_EVENT_DATE_CREATE);
		}

		json.MAP_NAME = (json.MAP_ID > 0) ? this.map[json.MAP_ID]?.NAME : null;
		json.ZONE_NAME = (json.ZONE_ID > 0) ? this.zone_map[json.ZONE_ID]?.NAME : null;
		json.SECTOR_NAME = (json.SECTOR_ID > 0) ? this.sector[json.SECTOR_ID]?.NAME : null;
		json.SERVICE_NAME = (json.SERVICE_ID > 0) ? this.service_map[json.SERVICE_ID]?.NAME : null;

		json.STATUS_NAME = (json.hasOwnProperty('STATUS_CODE') && json.STATUS_CODE !== null) ? this.status[json.STATUS_CODE].NAME : null;
		json.DESCRIPTION = (json.hasOwnProperty('STATUS_CODE') && json.STATUS_CODE !== null) ? this.status[json.STATUS_CODE].DESCRIPTION : null;

		json.CATEGORY = (json.CATEGORY === null) ? null: json.CATEGORY;

		json.LOCATION = null;
		json.LOCATION =  this.location(json);
		json.IS_FAVORITE = this.isFavorite(json.ID);

		json.EXCLUSIVE = (json.EXCLUSIVE !== null) ? Boolean(json.EXCLUSIVE) : false;
		json.SPECIAL = (json.SPECIAL !== null) ? Boolean(json.SPECIAL) : false;

		if(json.hasOwnProperty('SALE_STATUS_ID') && json.SALE_STATUS_ID !== null){
			json.SALE_STATUS_NAME = this.sale_status[json.SALE_STATUS_ID]?.NAME;
			json.SALE_STATUS_DESCRIPTION = this.sale_status[json.SALE_STATUS_ID]?.DESCRIPTION;
			json.SALE_STATUS_ID = Number(json.SALE_STATUS_ID);
		}else{
			json.SALE_STATUS_ID = null;
			json.SALE_STATUS_NAME = null;
			json.SALE_STATUS_DESCRIPTION = null;
		}

		json.TYPE_RECEPTION_ID = Number(json.TYPE_RECEPTION_ID);
		json.TYPE_RECEPTION_NAME = (json.TYPE_RECEPTION_NAME !== null) ? json.TYPE_RECEPTION_NAME : null;

		return json;
	};

	statusReserve = async (props = false, controller = false) => {
		return Api.Reserve.get(this.object.ID, props, controller).then(result => {
			if(result.success === true){
				result.data.STATUS = (result.data.hasOwnProperty('STATUS')) ? result.data.STATUS : false;
				result.data.EXISTS = (result.data.hasOwnProperty('EXISTS')) ? result.data.EXISTS : {};
				if(result.data.EXISTS !== false){
					result.data.EXISTS.ID = (result.data.EXISTS.hasOwnProperty('ID')) ? result.data.EXISTS.ID : null;
				}
				return result.data;
			}
			return result.success;
		})
	};

	addReserve = async (props = false, controller = false) => {
		return Api.Reserve.post(this.object.ID, props, controller).then(result => {
			if(result.success === true){
				return result.data;
			}
			return result.success;
		})
	};

	saveReserve = async (props = false, controller = false) => {
		return Api.Reserve.put(this.object.ID, props, controller).then(result => {
			if(result.success === true){
				return result.data;
			}
			return result.success;
		})
	};

	freeReserve = async (props = false, controller = false) => {
		return Api.Reserve.del(this.object.ID, props, controller).then(result => {
			if(result.success === true){
				return result.data;
			}
			return result.success;
		})
	};

	barcodeReserve = async (props = false, controller = false) => {
		return Api.Reserve.barcode(this.object.ID, props, controller).then(result => {
			if(result.success === true){
				return result.data;
			}
			return result.success;
		})
	};

	notice = (necessitates_total) => {
		let total = necessitates_total;
		if(total === 0){
			return  { type: "success", title: "Действия не требуются" };
		}else if(total > 3){
			return  { type: "danger", title: "Срочно обслужить" };
		}else{
			return  { type: "warning", title: "Обратить внимание" };
		}
	};

	location = (json) => {
		let location = {
			title: false,
			icon: false,
		};

		if(json.SECTOR_ID > 0){
			location.icon = 'my_location';
			location.title = `Сектор ${this.sector[json.SECTOR_ID].NAME}, место ${json.INNER_ID}`;
		}else if(json.SERVICE_ID > 0){
			location.icon = 'my_location';
			location.title = `${this.service_map[json.SERVICE_ID].NAME}`;
		}else if(json.ZONE_ID > 0){
			location.icon = 'my_location';
			location.title = `${this.zone_map[json.ZONE_ID].NAME}`;
		}

		return location;
	};

	timer(start, status_code = ''){
		let out = '';

		if(!start) start = '';
		let diff = ((new Date()).getTime() - (new Date(start.replace(/-/g, "/"))).getTime()) / 1000;
		let days = Math.floor(diff / 60 / 60 / 24);
		let hours = Math.floor(diff / 60 / 60) - (days * 24);
		let minutes = Math.floor(diff / 60) - (hours * 60) - (days * 60 * 24);
		let seconds =  Math.floor(diff % 60);

		if(seconds > 0 && minutes === 0) hours = 0; minutes = 0;
		if(days > 0) out += `${days} д. `;
		if(hours > 0) out += `${hours} ч `;
		if(minutes > 0) out += `${minutes} мин `;
		if(out === '') out += (status_code === 'T_DRIVE') ? `только что начался` : `только что началось`;

		return out;
	}
}
