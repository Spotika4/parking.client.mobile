import React from "react";

import { Footer, Dialog, Stick, Menu, Sider, Widget } from "../UI";
import { Storage, Api } from "./../App";

export const DefaultContextValue = {
	user: false,
	menu: {
		show: false
	},
	dialog: {
		show: false,
		type: 'alert',
		loading: false,
		header: false,
		content: false,
		buttons: false,
		footer: true,
		child: false,
	},
	widget: {
		show: false,
		header: false,
		child: () => null
	},
	sider: {
		show: false,
		child: () => null
	},
	favorite: []
};

export const Context = React.createContext(DefaultContextValue);

export class Provider extends React.Component {


	MAP = [];


    constructor(props) {
        super(props);

        this.state = {
        	...DefaultContextValue,
            user: Api.User.current(),
	        favorite: Storage.get('UF_FAVORITE', [])
        };

	    const MAP = Storage.collection('MAP');

    }

	componentDidMount = () => {

		return this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount = () => {

		return this.setState = (state, callback) => {
			return false;
		}
	};

    isAuth = () => {
        return (
            !(!this.state?.user?.object?.ID || !this.state?.user?.object?.UF_TOKEN)
        )
    };

    handleLogin = async (data) => {
        return await Api.User.login({
            LOGIN: data?.LOGIN,
            PASSWORD: data?.PASSWORD,
            UF_PUSH_TOKEN: data?.UF_PUSH_TOKEN,
        }).then(async (result) => {
            if(result.success === true){
                return await this.setState((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState.user,
                        ...result.data
                    }
                }), async () => await this.handleUpdate());
            }

	        return result.success;
        });
    };

    handleLogout = async () => {
	    return Api.User.logout().then((result) => {
		    if(result.success === true){
			    this.setState((prevState) => ({
				    ...prevState,
				    user: false
			    }));
			    localStorage.clear();
			    window.location.reload(true);
		    }else{
			    return `Не удалось выйти из приложения, попробуйте позже или обратитесь к администратору`
		    }
	    });
    };

    handleUpdate = async () => {
        return Storage.update().then(result => {
            if (result.success === true) {
                window.location.reload(true);
            }else{
	            this.handleDialog({
		            header: "Обновление кеша",
		            content: "Не удалось обновить данные кеша, попробуйте позже или обратитесь к администратору"
	            })
            }
        });
    };

    handleMenu = async () => {
	    return this.setState((prevState) => ({
		    ...prevState,
		    menu: {
			    ...prevState,
			    show: !this.state.menu.show
		    }
	    }));
    };

	handleHome = async (home) => {
		return this.state.user.home(home).then(result => {

			if(result !== true){
				// todo: действия после смены домашнего экрана
			}

			return result;
		});
	};

	handleLocation = async (id) => {
		return this.state.user.location(id).then(result => {

			if(result !== true){
				// todo: действия после смены локации юзером
			}

			return result;
		});
	};

	handleSider = async (sider = false) => {
		if(sider === false) sider = DefaultContextValue.sider;
		await this.setState((prevState) => ({
			...prevState,
			sider: {
				...prevState.sider,
				show: true,
				...sider
			}
		}));
	};

	handleWidget = async (widget = false) => {
		if(widget === false) widget = DefaultContextValue.widget;
		await this.setState((prevState) => ({
			...prevState,
			widget: {
				...prevState.widget,
				show: true,
				...widget
			}
		}));
	};

	handleDialog = async (dialog = false) => {

		return new Promise((resolve, reject) => {

			if(dialog === false){
				this.setState((prevState) => ({
					...prevState,
					dialog: DefaultContextValue.dialog
				}));
				return resolve();
			}

			if(this.state.dialog.show === true){
				this.setState((prevState) => ({
					...prevState,
					dialog: DefaultContextValue.dialog
				}));
			}

			if(dialog?.buttons) dialog.type = 'dialog';
			let type = (dialog?.type) ? dialog?.type : `alert`;

			const cancel = {
				className: (type === `alert`) ? 'btn d-block btn-primary w-100' : `btn d-block btn-outline-secondary ps-4 pe-4`,
				text: (type === `alert`) ? 'Хорошо' : `Отмена`,
				onClick: async () => {
					this.handleDialog(false);
					return resolve();
				}
			};

			const accept = {

				className: `btn d-block btn-primary ps-4 pe-4`,
				text: `Продолжить`,
				onClick: async () => {

					let result = true;
					if(dialog?.accept){

						this.setState((prevState) => ({
							...prevState,
							dialog: {
								...prevState.dialog,
								type: `loading`,
								loading: true
							}
						}));

						return dialog?.accept().then(async (result) => {

							if (result?.message) {

								this.handleDialog({
									type: `alert`,
									header: dialog.header,
									content: result?.message
								});

								return resolve(result)

							}else{

								if(result.success === false){
									return this.handleDialog({
										type: `alert`,
										header: dialog.header,
										content: `Произошла неизвестная ошибка`
									});
								}

								this.handleDialog(false);

								return resolve(result)
							}
						});

					}

					this.handleDialog(false);
					return resolve(result);
				}
			};

			this.setState((prevState) => ({
				...prevState,
				dialog: {
					...prevState.dialog,
					...dialog,
					type: type,
				}
			}));

			if(dialog?.type === 'loading'){
				this.setState((prevState) => ({
					...prevState,
					dialog: {
						...prevState.dialog,
						type: `loading`,
						loading: true,
						show: true
					}
				}));
				return resolve(true);
			}

			if(dialog?.type === 'confirm'){

				this.setState((prevState) => ({
					...prevState,
					dialog: {
						...prevState.dialog,
						type: 'dialog',
						buttons: [
							accept, cancel
						]
					}
				}));
			}

			if(dialog?.type === 'alert'){

				this.setState((prevState) => ({
					...prevState,
					dialog: {
						...prevState.dialog,
						type: 'alert',
						buttons: [
							cancel
						]
					}
				}));
			}

			if(dialog?.type === 'dialog'){

				dialog.buttons.push(cancel);

				this.setState((prevState) => ({
					...prevState,
					dialog: {
						...prevState.dialog,
						type: 'dialog',
						buttons: dialog.buttons
					}
				}));
			}

			this.setState((prevState) => ({
				...prevState,
				dialog: {
					...prevState.dialog,
					show: true
				}
			}));
		});
	}

	handleFavorite = (car_id) => {
		return Api.Favorite.put(car_id).then(result => {
			Storage.save('UF_FAVORITE', result.data[0]);

			this.setState((prevState) => ({
				...prevState,
				favorite: result.data[0]
			}));
		})
	};

    render() {

        return (
            <Context.Provider value={{
                state: this.state,
	            isAuth: this.isAuth,
	            login: this.handleLogin,
	            logout: this.handleLogout,
	            home: this.handleHome,
	            location: this.handleLocation,
	            widget: this.handleWidget,
	            dialog: this.handleDialog,
	            sider: this.handleSider,
	            favorite: this.handleFavorite,
            }}>

                <div className={`screen vw-100 ${this.state.sider.show === false ? 'active' : ''}`}>
	                {this.props.children}
                </div>

	            <Sider.Right
		            {...this.state.sider}
	            />

	            <Widget
		            handleWidget={this.handleWidget}
		            {...this.state.widget}
	            />

                <Dialog
	                handleDialog={this.handleDialog}
	                {...this.state.dialog}
                />

                <Stick />

                <Menu
	                {...this.state.menu}
	                sider={this.state.sider.show}
	                widget={this.state.widget.show}
	                handleMenu={this.handleMenu}
	                handleSider={this.handleSider}
	                home={this.state.user.object?.UF_HOME}
                />

                <Footer
	                menu={{
	                	...this.state.menu,
		                handleMenu: this.handleMenu
	                }}
	                sider={{
	                	...this.state.sider,
		                handleSider: this.handleSider
	                }}
                    home={this.state.user.object?.UF_HOME}
                    isAuth={this.isAuth}
                />

            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
