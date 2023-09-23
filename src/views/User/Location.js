import React from 'react';

import { Header, Checkbox } from "../../components/UI";
import { Object } from "../../components/App";

import { Context } from "../../components/App/Context";


export class Location extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);

		this.state = {
			active: this.context?.user.object.UF_LOCATION,
			locations: (new Object.Map()).collection()
		};
	}

	handleClick = async (location) => {
		const header = `Смена локации`;
		this.context.dialog({
			header,
			content: `Вы действительно хотите изменить выбранную локацию?`,
			buttons: [{
				text: 'Да',
				onClick: () => {
					this.context.dialog({
						header,
						type: `loading`
					});

					this.context.location(location).then(result => {
						if(result === true){
							this.context.dialog(false);
							return this.setState((prevState) => ({
								...prevState,
								active: location
							}));
						}

						this.context.dialog({
							header,
							content: `Сменить локацию не удалось`
						});
					});
				}
			}]
		});
	};

	render() {

		return (
			<>
				<Header title={`Укажите локацию`} onBackClick={() => this.props.history.push(`/`)} />

				<main>
					<div className="overflow-y-scroll h-100 p-3">
						{this.state.locations.length === 0 ? (
							<div className={"alert alert-warning"}>
								Локации не найдены
							</div>
						) : (
							this.state.locations.map((item, index) => (
								<Checkbox
									key={index}
									id={item.ID}
									header={item.NAME}
									onClick={this.handleClick}
									active={Number(this.context.state.user.object.UF_LOCATION) === Number(item.ID)}
								/>
							))
						)}
					</div>
				</main>

			</>
		);
	}
}
