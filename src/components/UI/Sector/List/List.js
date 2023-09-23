import React from 'react';
import { Link } from "react-router-dom";

import { Base } from "../../../UI/List";
import { Object } from "../../../App";

import { Item } from "./Item";


export class List extends Base {

	model = new Object.Sector();


	getItem(item, index){
		if(this.props.hasOwnProperty('onClick')){
			return (
				<Item
					{...item}
					key={index}
					onClick={this.props.onClick}
				/>
			)
		}

		return (
			<Link key={index} to={`/home/sector/${item.ID}`} className={'text-decoration-none'}>
				<Item
					{...item}
					onClick={null}
				/>
			</Link>
		);
	}
}
