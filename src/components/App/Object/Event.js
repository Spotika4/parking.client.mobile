
import { Api, Storage } from "../../App";
import { Car, History } from "../../App/Object";


export class Event {

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

		this.sectors = Storage.get('SECTOR');
		this.statuses = Storage.get('STATUS');
		this.maps = Storage.get('MAP');
		this.zones = Storage.get('ZONE_MAP');
		this.services = Storage.get('SERVICE_MAP');
		this.necessitates = Storage.get('NECESSITATE');
	}

	byUser = async (id, page = 1, controller = false) => {
		this.objects = [];
		return Api.User.history({id: id}, page, controller).then(result => {
			if(result.success === true){
				let car = new Car();
				let object = {};
				result.data['ITEMS'].forEach(item => {
					object = {};
					object.CAR = {};
					object.EVENTS = [];

					object.CAR = car.format(item.CAR);

					item.EVENTS.forEach(event => {
						object.EVENTS.push(this.format(event))
					});

					this.objects.push(object)
				});
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	byCar = async (id, page = 1, controller = false) => {
		this.objects = [];
		return Api.Car.history({id: id}, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => {
					this.objects.push(this.format(item))
				});
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		return Api.History.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => {
					this.objects.push(this.format(item))
				});
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT && Number(page) > 1) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	format = (json) => {

		if(json?.ID){
			json.ID = Number(json.ID);
			json.AUTHOR_ID = Number(json.AUTHOR_ID);
			json.CAR_ID = Number(json.CAR_ID);
			json.FLAG = (json.FLAG === null) ? null : Number(json.FLAG);
			json.MAP_ID = (json.MAP_ID === null) ? null : Number(json.MAP_ID);
			json.SECTOR_ID = (json.SECTOR_ID === null) ? null : Number(json.SECTOR_ID);
			json.SERVICE_ID = (json.SERVICE_ID === null) ? null : Number(json.SERVICE_ID);
			json.STATUS_ID = (json.STATUS_ID === null) ? null : Number(json.STATUS_ID);
			json.ZONE_ID = (json.ZONE_ID === null) ? null : Number(json.ZONE_ID);
			json.PLACE_ID = (json.PLACE_ID === null) ? null : Number(json.PLACE_ID);
			json.INNER_ID = (json.INNER_ID === null) ? null : Number(json.INNER_ID);
			json.CAR_NECESSITATE_ID = (json.CAR_NECESSITATE_ID === null) ? null : Number(json.CAR_NECESSITATE_ID);
			json.NECESSITATE_ID = (json.NECESSITATE_ID === null) ? null : Number(json.NECESSITATE_ID);

			json.RESPONSIBLE_ID = (json.RESPONSIBLE_ID === null) ? null : Number(json.RESPONSIBLE_ID);

			json.BADGE = false;
			json.DESCRIPTION = false;
			json.LOCATION = { icon: false, title: false };

			if(json.hasOwnProperty('DATE_CREATE') && json.DATE_CREATE !== null) {
				json.DATE_CREATE_FORMAT = new Date(json.DATE_CREATE.replace(/-/g, "/"));
			}

			json.DATE_DELIVERY_FORMAT = null;
			if(json.hasOwnProperty('DATE_DELIVERY') && json.DATE_DELIVERY !== null) {
				json.DATE_DELIVERY_FORMAT = new Date(json.DATE_DELIVERY.replace(/-/g, "/"));
			}

			if(json.STATUS_ID !== null){

				json.BADGE = this.statuses[json.STATUS_CODE]?.NAME;
				json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} изменил статус, ${this.statuses[json.STATUS_CODE]?.DESCRIPTION}`;

				if(json.SECTOR_ID){
					json.LOCATION.title = `Сектор ${this.sectors[json.SECTOR_ID].NAME}, место ${json.INNER_ID}`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} оставил автомобиль на парковке`;
				}else if(json.SERVICE_ID){
					json.LOCATION.title = `${this.services[json.SERVICE_ID].NAME}`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} оставил автомобиль в сервисе`;
				}else if(json.ZONE_ID){
					json.LOCATION.title = `${this.zones[json.ZONE_ID].NAME}`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} оставил автомобиль на территории ${this.zones[json.ZONE_ID].NAME}`;
				}else{
					json.LOCATION.icon = `perm_identity`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME}`;
				}

			}else if(json.RESPONSIBLE_ID !== null){

				json.BADGE = `Сменился ответственный`;
				json.LOCATION.icon = `perm_identity`;
				json.LOCATION.title = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME}`;
				json.DESCRIPTION = `взят под ответственность сотрудника ${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME}`;

				if(json.FLAG === 1){
					json.BADGE = `Новый ответственный`;
					json.LOCATION.icon = `perm_identity text-success`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} взял автомобиль в работу`;
				}else if(json.RESPONSIBLE_ID && json.FLAG === 3){
					json.BADGE = `Новый ответственный`;
					json.LOCATION.icon = `perm_identity text-danger`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} взял автомобиль у ${json.RESPONSIBLE_NAME} ${json.RESPONSIBLE_LAST_NAME} и продолжил работы`;
				}else if(json.FLAG === 2){
					json.BADGE = `Автомобиль осовободился`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} закончил работы`;
				}else if(json.FLAG === 10){
					json.BADGE = `Демонстрация`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} начал демонстрацию автомобиля`;
				}

			}else if(json.CAR_NECESSITATE_ID !== null){

				json.BADGE = `Потребность ${json.FLAG}`;
				json.LOCATION.title = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME}`;

				if(json.FLAG === 2){
					json.BADGE = `Закрыта потребность`;
					json.LOCATION.icon = `build text-success`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} закрыл потребность ${this.necessitates[json.NECESSITATE_ID].NAME}`;
				}else if(json.FLAG === 1){
					json.BADGE = `Добавлена потребность`;
					json.LOCATION.icon = `build text-danger`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} добавил потребность ${this.necessitates[json.NECESSITATE_ID].NAME}`;
				}

			}else if(json.IGNITION_KEY !== null){

				json.LOCATION.icon = `vpn_key`;
				json.LOCATION.title = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME}`;

				if(json.FLAG === 1){
					json.BADGE = `Ключи на хранении`;
					json.LOCATION.icon = `vpn_key text-danger`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} включил управление ключами`;
				}else if(json.FLAG === 2){
					json.LOCATION.icon = `vpn_key`;
					json.BADGE = `Ключи в салоне`;
					json.LOCATION.icon = `vpn_key text-success`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} выключил управление ключами`;
				}else if(json.FLAG === 3){
					json.LOCATION.icon = `vpn_key`;
					json.BADGE = `Ключи у сотрудника`;
					json.LOCATION.icon = `vpn_key text-success`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} забрал ключи`;
				}else if(json.FLAG === 4){
					json.BADGE = `Ключи в салоне`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} оставил ключи в салоне автомобиля`;
				}

			}else if(json.ACCUMULATOR !== null){
				json.LOCATION.icon = `offline_bolt`;
				json.LOCATION.title = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME}`;

				if(json.FLAG === 1){
					json.BADGE = `Аккумулятор снят`;
					json.LOCATION.icon = `offline_bolt text-danger`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} забрал аккмулятор`;
				}else if(json.FLAG === 2){
					json.LOCATION.icon = `offline_bolt text-success`;
					json.BADGE = `Аккумулятор установлен`;
					json.DESCRIPTION = `${json?.AUTHOR_NAME} ${json?.AUTHOR_LAST_NAME} поставил аккумулятор`;
				}

			}else if(json.MAP_ID !== null){
				json.BADGE = `Смена локации`;
				json.LOCATION.title = `${this.maps[json.MAP_ID].NAME}`;
				json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} сменил локацию автомобиля`;

			}else if(json.DATE_DELIVERY !== null){
				json.BADGE = `Выдача`;
				json.LOCATION.icon = `event_note`;
				json.LOCATION.title = `${json.DATE_DELIVERY_FORMAT.toLocaleTimeString("ru-RU")}, ${json.DATE_DELIVERY_FORMAT.toLocaleDateString("ru-RU")}`;
				json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} назначил дату выдачи`;

				if(json.FLAG === 1){
					json.LOCATION.icon = `event_note text-success`;
					json.DESCRIPTION = `${json.AUTHOR_NAME} ${json.AUTHOR_LAST_NAME} изменил дату выдачи`;
				}else if(json.FLAG === 2){
					json.LOCATION.icon = `event_note text-danger`;
					json.DESCRIPTION = `${this.props?.AUTHOR_NAME} ${this.props?.AUTHOR_LAST_NAME} отменил выдачу`;
				}
			}
		}

		return json;
	};
}
