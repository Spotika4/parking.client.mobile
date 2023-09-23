import React from 'react';

import { Necessitate, Spinner } from "../../../../UI";
import { Object } from "../../../../App";

import { Button } from "./Button";


export class Buttons extends React.Component {


	constructor(props){
		super(props);
	}

	handleClick = async (item) => {
		item.loading = true;
		this.props.context.dialog({
			header: 'Добавление потребности',
			footer: false,
			child: () => <Necessitate.Form
				item={item}
				car_id={this.props.car_id}
				context={this.props.context}
				callback={() => {
					this.props.callback();
					this.componentDidMount()
				}}
				cancel={() => {
					item.loading = false;
				}}
			/>,
		});
	};

	render(){
		return (
			this.props?.necessitates?.length && this.props.necessitates?.length > 0 ? (
				<div className={`p-0 mt-3`}>
					<h3 className={`mt-4 fw-bold`}>Назначить потребность</h3>
					<div className={`overflow-auto`}>
						<div className={`flex-row overflow-auto min-width-content`}>
							{this.props.necessitates.map((group, g) =>
								<div className={`d-flex flex-row mb-3`} key={g}>
									{group.map((necessitate, n) =>
										<Button
											key={n}
											loading={necessitate?.loading}
											onClick={() => this.handleClick(necessitate)}
											disabled={necessitate.ADDED !== false}
										>
											{necessitate.NAME}
										</Button>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			) : null
		);
	}
}
