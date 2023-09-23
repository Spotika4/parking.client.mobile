import React from 'react';
import { NavLink } from "react-router-dom";


export class Menu extends React.Component {


	constructor(props){
		super(props);
	}

	handleClick = async () => {
		if(this.props.sider){
			await this.props.handleSider();
		}
		if(this.props.widget){
			await this.props.handleWidget();
		}
	};

	render(){
		return (
			<div className={this.props.show ? `widget vw-100 fade show active` : `widget vw-100 fade`} onClick={this.props.handleMenu} >

				<div className={this.props.show ? `modal-backdrop fade show active` : `widget vw-100 fade`} />

				<div className="container-fluid p-0">
					<menu className="list-group shadow pt-3 pb-3 bg-body" onClick={this.handleClick}>
						{this.props.home === 'parking' ? (
							<NavLink activeclassname={'active'} to={"/home/filter"} className={"list-group-item border-0"}>
	                            <span className="before alert alert-info p-0 mb-0 mr-3">
	                                <i className="icon-search" />
	                            </span>
								Поиск
							</NavLink>
						) : (
							<NavLink activeclassname={'active'} to={"/home/parking"} className={"list-group-item border-0"}>
	                            <span className="before alert alert-info p-0 mb-0 mr-3">
	                                <i className="icon-directions_car" />
	                            </span>
								Парковка
							</NavLink>
						)}
						<NavLink activeclassname={'active'} to={"/colleague"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className="icon-account_circle" />
                            </span>
							Коллеги
						</NavLink>
						<NavLink activeclassname={'active'} to={"/user/location"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className="icon-pin_drop" />
                            </span>
							Сменить локацию
						</NavLink>
						<NavLink activeclassname={'active'} to={"/settings/home"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className="icon-phonelink_setup" />
                            </span>
							Главный экран
						</NavLink>
						<NavLink activeclassname={'active'} to={"/user/favorite"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className={"icon-star_outline"} />
                            </span>
							Избранное
						</NavLink>
						<NavLink activeclassname={'active'} to={"/settings/options"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className={"icon-settings"} />
                            </span>
							Настройки
						</NavLink>
						<NavLink activeclassname={'active'} to={"/more/about"} className={"list-group-item border-0"}>
                            <span className="before alert alert-info p-0 mb-0 mr-3">
                                <i className="icon-error_outline" />
                            </span>
							О приложении
						</NavLink>
					</menu>
				</div>
			</div>
		);
	}
}
