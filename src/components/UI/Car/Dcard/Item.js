import React from 'react';

import {Scroller, Spinner} from "../../../UI";
import { Object } from "../../../App";

import { Block } from "./Block";
import { Sprite } from "./Sprite";


export class Item extends React.Component {

	model = new Object.Dcard();


	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			id: props.id,
			item: (props?.item) ? props?.item : false
		};
	}

	componentDidMount = async () => {

		this.model.get(this.state.id).then(success => {
			this.setState((prevState) => ({
				...prevState,
				loading: false,
				item: (success === true) ? this.model.object : null
			}));
		});
	};

	render() {
		return (
			<Scroller className={`pb-9`}>
				{this.state.loading === true ? ( <Spinner /> ) : (
					this.state?.item && this.state.item.length > 0 ? (
						<>
							<div className={`mb-3`}>
								<Sprite
									items={this.state.item[0].blockList}
								/>
							</div>
							{this.state.item.map((card, index) =>
								<Block
									key={index}
									name={card.name}
									item={card.blockList}
								/>
							)}
						</>
					) : (
						<div className={`alert alert-info`}>Ничего не найдено</div>
					)
				)}
			</Scroller>
		)
	}
}
