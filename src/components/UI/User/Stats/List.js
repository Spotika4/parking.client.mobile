import React from 'react';

import { User } from "../../../App/Api";
import { Scroller } from "../../../UI/Scroller";


export class List extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			controller: null,
			loading: true,
			items: null
		};
	}

	componentDidMount = () => {
		this.setState((prevState) => ({
			...prevState,
		}));
		this.handleLoadItems().then(r => {
			return r;
		});
	};

	componentWillUnmount(){
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		this.setState = (state, callback) => {
			return false;
		};
	}

	handleLoadItems = async () => {
		if(this.state.controller?.abort){
			this.state.controller.abort();
		}

		const controller = new AbortController();
		await this.setState((prevState) => ({
			...prevState,
			items: [],
			loading: true,
			controller: controller
		}), () => User.stats({id: this.props.ID}, 'all', controller).then(result => {
			if(result.success !== false){
				return this.setState((prevState) => ({
					...prevState,
					loading: false,
					controller: null,
					items: result.data
				}));
			}
		}));
	};

    render() {

        return (this.state.loading === true ? ( <div className="spinner mt-5" /> ) : (
	        <Scroller
		        onSwipe={this.handleLoadItems}
	        >
		        <div className={'p-3 rounded shadow'}>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-local_parking" />
	                        </span>
				            <div className="d-block">
					            Припарковано
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.PARKING}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-multiple_stop" />
	                        </span>
				            <div className="d-block">
					            Перемещения
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.MOVING}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-place" />
	                        </span>
				            <div className="d-block">
					            Перемещения в зону
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.ZONE}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-handyman" />
	                        </span>
				            <div className="d-block">
					            Перемещения в сервис
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.SERVICE}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-refresh" />
	                        </span>
				            <div className="d-block">
					            Подготовка к тест-драйву
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.PRE_TDRIVE}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-emoji_transportation" />
	                        </span>
				            <div className="d-block">
					            Тест-драйв
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.TDRIVE}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-plumbing" />
	                        </span>
				            <div className="d-block">
					            Добавил потребности
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.ADD_NECESSITATES}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-done" />
	                        </span>
				            <div className="d-block">
					            Завершил потребности
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.END_NECESSITATES}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-person_pin_circle" />
	                        </span>
				            <div className="d-block">
					            Демонстрация
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.DEMO}
	                        </span>
			            </div>
		            </div>
		            <div className="d-flex justify-content-between mb-3 align-content-center">
			            <div className="d-flex align-items-center">
	                        <span className="rounded-pill text-center fs-2 me-4">
	                            <i className="icon-done_all" />
	                        </span>
				            <div className="d-block">
					            Выдал
				            </div>
			            </div>
			            <div className="d-flex align-items-center">
	                        <span className="badge rounded-pill text-bg-primary ps-3 pe-3">
	                            {this.state.items?.DELIVERY}
	                        </span>
			            </div>
		            </div>
		        </div>
	        </Scroller>
        ));
    }
}
