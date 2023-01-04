import React from 'react';
import { NavLink } from "react-router-dom";


export class Footer extends React.Component {


    render() {

        return (
            <footer className={`shadow-lg${this.props.isAuth() ? `` : ` d-none`}`}>
                <menu>
                    <li>
                        <NavLink activeclassname={'active'} to={"/home"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center mt-2 justify-content-center">
                                <i className="icon-directions_car" />
                            </span>
                            <span className="d-flex flex-row justify-content-center mt-1">Парковка</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname={'active'} to={"/home"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center mt-2 justify-content-center">
                                <i className="icon-star_outline" />
                            </span>
                            <span className="d-flex flex-row justify-content-center mt-1">Избранное</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname={'active'} to={"/home"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center mt-2 justify-content-center">
                                <i className="icon-assignment" />
                            </span>
                            <span className="d-flex flex-row justify-content-center mt-1">Заявки</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeclassname={'active'} to={"/home"} className="d-flex flex-column text-decoration-none text-muted">
                            <span className="d-flex flex-row align-content-center mt-2 justify-content-center">
                                <i className="icon-more_horiz" />
                            </span>
                            <span className="d-flex flex-row justify-content-center mt-1">Еще</span>
                        </NavLink>
                    </li>
                </menu>
            </footer>
        );
    }
}
