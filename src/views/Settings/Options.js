import React from 'react';

import { Header, Scroller } from "../../components/UI";
import { Context } from "../../components/App/Context";


export class Options extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentWillUnmount() {
		return this.setState = (state, callback) => {
			return false;
		}
	}

	render() {

		return (
			<>
				<Header title={`Настройки`} onBackClick={() => this.props.history.push(`/`)} />

				<main>
					<Scroller>

						<div className="d-block col position-relative rounded p-3 shadow mb-4">
							<h5>Сбросить кеш</h5>
							<div className="text-muted">Очистка приложения от кешируемых данных. После очистки необходимо заново пройти авторизацию</div>
							<small className="d-block mt-3 link-primary fw-bold">Очистить</small>
						</div>

						<div className="d-block col position-relative rounded p-3 shadow mb-4" onClick={() => this.props.history.push(`/settings/info`)}>
							<h5>Об устройстве</h5>
							<div className="text-muted">Подробная информация об устройстве</div>
							<small className="d-block mt-3 link-primary fw-bold">Подробности</small>
						</div>

					</Scroller>
				</main>

			</>
		);
	}
}
