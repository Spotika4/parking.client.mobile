import React from 'react';
import { NavLink } from "react-router-dom";


export class Footer extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			home: this.props.home
		};
	}

	componentDidMount() {
		this.setState((prevState) => ({
			...prevState
		}));
	}

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return false;
		}
	}

	handleClick = async (e) => {
		e.persist();
		if(this.props.menu.show === true){
			this.props.menu.handleMenu()
		}
		if(this.props.sider.show === true){
			this.props.sider.handleSider()
		}
	};

    render() {

        return (
            <footer className={`shadow-lg ${this.props.isAuth() ? `` : `d-none`}`}>
                <menu className={this.props.menu.show === true ? `menu-show` : ``}>
                    <li onClick={this.handleClick}>
	                    <NavLink activeclassname={'text-body'} to={"/home/"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center justify-content-center">
			                    {this.props.home === 'parking' ? ( <i className="icon-directions_car" /> ) : ( <i className="icon-search" /> )}
                            </span>
	                    </NavLink>
                    </li>
	                <li onClick={this.handleClick}>
                        <NavLink activeclassname={'text-body'} to={"/map/"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center justify-content-center">
                                <i className="icon-map" />
                            </span>
                        </NavLink>
                    </li>
	                <li onClick={this.handleClick}>
                        <NavLink activeclassname={'text-body'} to={"/tickets"} className={`d-flex flex-column text-decoration-none text-muted`}>
                            <span className="d-flex flex-row align-content-center justify-content-center">
                                <i className="icon-construction" />
                            </span>
                        </NavLink>
                    </li>
                    <li onClick={this.props.menu.handleMenu} >
                        <span className={(this.props.menu.show === true) ? `d-flex flex-column text-decoration-none text-body` : `d-flex flex-column text-decoration-none text-muted`}>
                            <span className="d-flex flex-row align-content-center justify-content-center">
                                <i className="icon-more_horiz" />
                            </span>
                        </span>
                    </li>
                </menu>
            </footer>
        );
    }
}
