import React from "react";

import { Footer } from "../UI/Footer";
import { Dialog } from "./Modal";
import { User } from "./Object";

export const Context = React.createContext({});

export class Provider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: User.current(),
            dialog: {
                show: false
            },
        };
    }

	componentDidMount = () => {

		return this.setState((prevState) => ({
			...prevState,
		}));
	};

	componentWillUnmount() {

		this.setState = (state, callback) => {
			return false;
		}
	}

    isAuth = () => {
        return (
            !(!this.state?.user?.ID || !this.state?.user?.UF_TOKEN)
        )
    };

    login = async (props) => {
        return await User.login(props).then(async (result) => {
            if(result.success === true){
                await this.setState((prevState) => ({
                    ...prevState,
                    user: {
                        ...prevState,
                        ...User.current()
                    }
                }));
            }

            return result.success;
        });
    };

    logout = async (props) => {
        return await User.logout().then(async (result) => {
            if(result.success === true){
                await this.setState((prevState) => ({
                    ...prevState,
                    user: false
                }));
            }

            return result.success;
        });
    };

    dialog = async (props) => {
        await this.setState((prevState) => ({
            ...prevState,
            dialog: {
                ...prevState.dialog,
                ...props
            }
        }));
    };

    render() {

        return (
            <Context.Provider value={{
                state: this.state,
                login: this.login,
                logout: this.logout,
                isAuth: this.isAuth,
                dialog: this.dialog,
            }}>

                <div className="screen vw-100 active" id="APP">
	                {this.props.children}
                </div>

                <Dialog
                    {...this.state.dialog}
                    handle={this.dialog}
                />

                <Footer
                    isAuth={this.isAuth}
                />

            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;
