import React from 'react';

import { Context } from "../../components/App/Context";


export class Auth extends React.Component {

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false,
            data: {
                LOGIN: '',
                PASSWORD: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.visiblePassword = this.visiblePassword.bind(this);
    }

    componentDidMount() {
        this.handleSubmit = this.handleSubmit.bind(this);
        this.visiblePassword = this.visiblePassword.bind(this);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    visiblePassword = async (e) => {
        await this.setState((prevState) => ({
            ...prevState,
            visible: !this.state.visible
        }));
    };

    handleChange = async (e) => {
        e.persist();
        await this.setState((prevState) => ({
            data: {
                ...prevState.data,
                [e.target.name]: e.target.value
            }
        }));
    };

    validate = (e) => {
        e.preventDefault();
        let textsFields = ['text', 'password'];

        let fields = [];
        let errors = false;

        for (let i = 0; i < e.target.elements.length; i++) {
            if(e.target.elements[i].name === '') continue;
            if(e.target.elements[i].min){
                let type = e.target.elements[i].type;

                if(textsFields.indexOf(type) > -1){
                    errors = (e.target.elements[i].value.length < e.target.elements[i].min);
                    if(errors === true){
                        e.target.elements[i].classList.add('is-invalid');
                        e.target.elements[i].classList.remove('border-primary');
                    }else{
                        e.target.elements[i].classList.add('border-primary');
                        e.target.elements[i].classList.remove('is-invalid');
                    }
                }
            }

            fields[e.target.elements[i].name] = e.target.elements[i].value;
        }
        return (errors === true) ? false : fields;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let validate = this.validate(e);
        if(validate === false) return false;

        this.setState((prevState) => ({
            ...prevState,
            loading: true
        }));

        window.dispatchEvent(new CustomEvent(`app.login`, { detail: {
            LOGIN: this.state.data.LOGIN,
            PASSWORD: this.state.data.PASSWORD,
            UF_PUSH_TOKEN: false,
            callback: () => {
                this.setState((prevState) => ({
                    ...prevState,
                    loading: false
                }));
            }
        }}));
    };

    render(){

        return (
            <div className="d-flex flex-fill align-items-center bg-secondary bg-opacity-10">
                <div className="container">
                    <div className="d-flex justify-content-center mb-4">
                        <div className="w-25">
                            <img src="img/logotype.png" alt="" className="w-100" />
                        </div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <input
                                min={1}
                                type={"text"}
                                name={"LOGIN"}
                                autoComplete={"off"}
                                placeholder="Введите логин"
                                value={this.state.data.LOGIN || ''}
                                onChange={this.handleChange}
                                className={`form-control form-control-lg shadow`}
                            />
                        </div>
                        <div className="mb-3">
                            <div className="input-group">
                                <input
                                    min={1}
                                    type={this.state.visible ? `text` :`password`}
                                    name={`PASSWORD`}
                                    autoComplete={`off`}
                                    placeholder={`Введите логин`}
                                    value={this.state.data.PASSWORD || ``}
                                    onChange={this.handleChange}
                                    className={`form-control form-control-lg shadow`}
                                />
                                <span className="input-group-text bg-transparent fs-4" onClick={this.visiblePassword}>
                                    <i className="icon icon-visibility_off" />
                                </span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button
                                className="btn btn-primary w-100 pt-2 pb-2 fs-5"
                                type="submit"
                                disabled={this.state.loading}
                            >
                                <span className={this.state.loading ? `spinner-grow spinner-grow-sm me-2` : `d-none`} />
                                Войдите в систему
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
