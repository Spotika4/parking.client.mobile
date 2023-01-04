import React from "react";

import { Footer, Dialog, Stick } from "../UI";
import { Api } from "./";

export const Context = React.createContext({});

export class Provider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: Api.User.current(),
            dialog: {
                show: false
            }
        };
    }

	componentDidMount = () => {

        window.addEventListener('app.update', this.update);
        window.addEventListener('app.login', this.login);
        window.addEventListener('app.logout', this.logout);
		return this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount = () => {

        window.removeEventListener('app.update', this.update);
        window.removeEventListener('app.login', this.login);
        window.removeEventListener('app.logout', this.logout);
		this.setState = (state, callback) => {
			return false;
		}
	};

    isAuth = () => {
        return (
            !(!this.state?.user?.ID || !this.state?.user?.UF_TOKEN)
        )
    };

    login = async (e) => {
        return await Api.User.login({
            LOGIN: e.detail?.LOGIN,
            PASSWORD: e.detail?.PASSWORD,
            UF_PUSH_TOKEN: e.detail?.UF_PUSH_TOKEN,
        }).then(async (result) => {
            if(result.success === true){
                await this.setState((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState,
                        ...Api.User.current()
                    }
                }), () => window.dispatchEvent(new CustomEvent(`app.update`, { detail: { silent: true}})));
            }else{
                window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
                    header: "Не удалось авторизоваться",
                    content: "Логин или пароль не верны. Обратитесь в техническую поддержку"
                }}));
            }

            if(e.detail?.callback) e.detail?.callback();
        });
    };

    logout = async (props) => {
        window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
            header: "Выйти из приложения",
            content: "Вы действительно хотите покинуть приложение?",
            buttons: [{
                text: 'Да',
                onClick: async () => {
                    return Api.User.logout().then((result) => {
                        if(result.success === true){
                            this.setState((prevState) => ({
                                ...prevState,
                                user: false
                            }));
                            localStorage.clear();
                            window.location.reload(true);
                        }else{
                            return `Не удалось выйти из приложения`
                        }
                    });
                }
            }]
        }}));
    };

    update = async (e) => {
        const run = () => Api.Db.get().then(result => {
            if (result !== false) {
                window.location.reload(true);
            }

            return result;
        });

        if(e.detail?.silent && e.detail?.silent === true){
            await run();
        }else{
            window.dispatchEvent(new CustomEvent(`app.dialog`, { detail: {
                header: "Внимание",
                content: "Ваша версия кеша не соответствует серверной и требует обновления.",
                onClose: run
            }}));
        }

    };

    render() {

        return (
            <Context.Provider value={{
                state: this.state,
                isAuth: this.isAuth
            }}>

                <div className="screen vw-100 active" id="APP">
	                {this.props.children}
                </div>

                <Dialog />
                <Stick />

                <Footer
                    isAuth={this.isAuth}
                />

            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
