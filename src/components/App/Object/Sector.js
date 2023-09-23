
import { Api, Object, Storage } from "../../App";


export class Sector {

	controller;

	object = {};
	objects = [];
	nav = {
		PAGE: 1,
		NEXT_PAGE: 2,
		PAGE_COUNT: 1,
	};

	places;


	constructor(json = false){
		this.places = [];
		if(json !== false){
			this.object = this.format(json);
		}
	}

	import = async (id) => {
		let SECTORS = Storage.get('SECTOR', false);
		if(SECTORS && SECTORS[id]){
			this.object = this.format(SECTORS[id]);
		}

		return this;
	};

	list = async (props, page = 1, controller = false) => {
		this.objects = [];
		this.nav.page = page;
		return Api.Sector.list(props, page, controller).then(result => {
			if(result.success === true){
				result.data['ITEMS'].forEach(item => this.objects.push(this.format(item)));
				this.nav = result.data['NAV'];
				this.nav.NEXT_PAGE = (result.data['NAV'].PAGE < result.data['NAV'].PAGE_COUNT) ? result.data['NAV'].PAGE + 1 : false;
			}
			return result.success;
		})
	};

	render = async () => {
		let render = [], row = [];
		let x = 0, y = 0;

		if(this.controller?.abort){
			this.controller.abort();
		}

		let schema = this.object.SCHEMA;
		schema.width = Number(schema.width);

		let tileset = this.object.SCHEMA.tilesets[0];
		let tiles = tileset?.tiles;

		let table = [];
		let data = this.object.SCHEMA.layers[0].data;
		let objects = this.object.SCHEMA.layers[1].objects;

		let model = new Object.Place();
		this.controller = new AbortController();
		await model.list({ SECTOR_ID: this.object.ID }, 'all', this.controller).then(result => {
			if(result === true){
				model.objects.forEach(obj => this.places[obj.ID] = obj);
			}
		});

		objects.forEach(obj => {
			let x = (obj.x === 0) ? 0 : (obj.x / obj.width);
			let y = (obj.y === 0) ? 0 : (obj.y / obj.height) - 1;
			if(!table[y]) table[y] = [];

			obj.x = x; obj.y = y;

			// todo: парковочные места в массиве. отсчет с 0
			obj.place = this.places[obj.properties[0].value];

			table[y][x] = obj;
		});

		for (let i = 0; i <= data.length; i++) {
			let tileId = Number(data[i] - 1);

			if(x === schema.width){
				render.push(row); row = [];
				x = 0; y = y + 1;
			}

			if(tiles[tileId]){
				let tile = tiles[tileId];
				let icon = ``;
				let className = `sector-cell x-${x} y-${y}`;
				let cell = (table[y] && table[y][x]) ? table[y][x] : [];

				cell.properties = tile.properties;

				for (let pi = 0; pi <= tile.properties.length; pi++) {
					if(tile.properties[pi]){
						if(tile.properties[pi]?.name === 'class'){
							className += ` tile-cell tile-${tile.properties[pi].value}`;
						}
					}
				}

				if(cell?.place?.CAR_ID) className += ` car-cell`;
				if(cell?.place?.INNER_ID || cell?.place?.CAR_ID) className += ` place-cell inner_id-${cell?.place?.INNER_ID} place_id-${cell?.place?.ID} car_id-${cell?.place?.CAR_ID}`;
				if(cell?.place?.NECESSITATE_TOTAL > 0) icon = `icon-build bg-danger text-white`;

				row.push({ ...cell, className, icon });
			}

			x = x + 1;
		}

		return render;
	};

	format = (json = this.object) => {

		json.ID =  Number(json.ID);
		json.MAP_ID =  Number(json.MAP_ID);
		json.CAR_TOTAL = (json?.CAR_TOTAL) ? Number(json.CAR_TOTAL) : 0;
		json.PLACE_TOTAL = (json?.PLACE_TOTAL) ? Number(json.PLACE_TOTAL) : 0;
		json.CAR_NECESSITATE_TOTAL = (json?.CAR_NECESSITATE_TOTAL) ? Number(json.CAR_NECESSITATE_TOTAL) : 0;

		json.CAR_NECESSITATE_STATE = 'warning';
		if(json.CAR_NECESSITATE_TOTAL === 0) json.CAR_NECESSITATE_STATE = `success`;
		if(json.CAR_NECESSITATE_TOTAL > 5) json.CAR_NECESSITATE_STATE = `danger`;

		json.FILLED = `${json.CAR_TOTAL} занято из ${json.PLACE_TOTAL}`;
		if(json.CAR_TOTAL === 0) json.FILLED = `Сектор свободен`;
		else if(json.CAR_TOTAL === json.PLACE_TOTAL) json.FILLED = `Сектор заполнен`;

		return json;
	};
}
