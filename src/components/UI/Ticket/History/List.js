import React from 'react';

import { Base } from "../../../UI/List";
import { Object } from "../../../App";
import { Item } from "./Item";


export class List extends Base {

	model = new Object.Ticket();


	getItem(item, index){
		return (
			<div key={index} className={'text-decoration-none'}>
				<Item
					item={item}
				/>
			</div>
		)
	}
}
