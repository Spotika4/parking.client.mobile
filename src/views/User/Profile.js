import React from 'react';

import { Context } from "../../components/App/Context";
import { User } from "../../components/App";

import { Header } from "../../components/UI/Header";
import { Tabs } from "../../components/UI/Tabs";


export class Profile extends React.Component {

    static contextType = Context;


    constructor(props){
        super(props);
        this.state = {

        };

        this.handleExit = this.handleExit.bind(this);
    }

    componentDidMount() {
        this.handleExit = this.handleExit.bind(this);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleExit = (e) => {
        return this.context.logout();
    };

    render(){

        return (
            <>
                <Header
                    title={`Профиль`}
                    onBackClick={() => this.props.history.push('/')}
                />

                <main>

                    <div className="d-flex flex-column overflow-hidden h-100">
                        <div className="d-flex flex-row p-3 shadow">
                            <img className="rounded-circle" src={this.context.state.user?.PERSONAL_PHOTO} alt={""} />
                            <div className="ms-3">
                                <div className="d-block fs-5 mb-1">
                                    <strong className="d-block">{this.context.state.user?.LAST_NAME}</strong>
                                    <strong className="d-block">{this.context.state.user?.NAME}</strong>
                                </div>
                                <div className="text-muted small">Продавец-консультант / Администратор</div>

                                <div className="link-info mt-4" onClick={this.handleExit}>Выйти</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row overflow-hidden shadow">

                                <Tabs tabs={[
                                    { name: 'Профиль', fill: true, children: (
                                        <User.Profile
                                            id={this.context.state.user?.ID}
                                        />
                                    ) },
                                    { name: 'История', fill: true, children: (
                                        <div className={'scroller'}>
                                            <div className={'p-3 vw-100'}>
                                                <div className="card shadow border-0">
                                                    <div className="card-body">
                                                        <div className="card-title mb-0 fs-4 fw-bold">Hyundai Creta</div>
                                                        <div className="small mb-2 text-muted">VIN Z94G2811BKR167024</div>
                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                            <span className="badge rounded-pill text-bg-secondary text-center">
                                                                Демонстрация
                                                            </span>
                                                            <div className="d-block text-muted">
                                                        <span className="d-inline-block me-2">
                                                            <i className="icon icon-access_time mr-1" /> 08:32:14
                                                        </span>
                                                                <span>
                                                            <i className="icon icon-event_note mr-1" /> 04.10.2022
                                                        </span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center mt-2">
                                                            <div className="d-block">
                                                                <i className="icon icon-perm_identity mr-1" /> Александр Кобцев
                                                            </div>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-block text-muted">
                                                                Александр Кобцев начал демонстрацию автомобиля
                                                            </div>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <a href="#" className="card-link text-decoration-none">Подробнее</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) },
                                    { name: 'Статистика', fill: true, children: (
                                        <div className={'scroller'}>
                                            <div className={'p-3 vw-100'}>
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
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
                                                        <span className="badge rounded-pill text-bg-primary">
                                                            12
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) }
                                ]} />

                        </div>
                    </div>

                </main>
            </>
        );
    }
}
