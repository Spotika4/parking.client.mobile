import React from 'react';

import { Base } from "../../../UI/List";
import { Object } from "../../../App";
import { Item } from "./Item";


export class Log extends Base {

	model = new Object.Event();

	getItem(item, index){
		return (
			<Item
				key={index}
				item={item}
			/>
		)
	}
}
