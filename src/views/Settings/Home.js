import React from 'react';

import { Header, Checkbox } from "../../components/UI";

import { Context } from "../../components/App/Context";


export class Home extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);
	}

	handleClick = async (home) => {
		const header = `Смена домашнего экрана`;
		this.context.dialog({
			header,
			content: `Вы действительно хотите сменить домашний экран?`,
			buttons: [{
				text: 'Да',
				onClick: () => {
					this.context.dialog({
						header,
						type: `loading`
					});

					this.context.home(home).then(result => {
						if(result === true){
							this.context.dialog(false);
							return this.setState((prevState) => ({
								...prevState,
								active: home
							}));
						}

						this.context.dialog({
							header,
							content: `Сменить главный экран не удалось`
						});
					});
				}
			}]
		});
	};

	render() {

		return (
			<>
				<Header title={`Выберите главный экран`} onBackClick={() => this.props.history.push(`/`)} />

				<main>
					<div className="overflow-y-scroll h-100 p-3">
						<Checkbox
							id={'parking'}
							onClick={this.handleClick}
							active={this.context?.state.user.object.UF_HOME === 'parking'}
							header={'Список секторов'}
							description={'Список секторов с информацией о потрбностях'}
						/>

						<Checkbox
							id={'filter'}
							onClick={this.handleClick}
							active={this.context?.state.user.object.UF_HOME === 'filter'}
							header={'Поиск автомобилей'}
							description={'Фильтр автомобилей по заданным параметрам'}
						/>
					</div>
				</main>

			</>
		);
	}
}
