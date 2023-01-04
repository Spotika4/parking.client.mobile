import React from 'react';

import { Button } from "./Button";


export class Dialog extends React.Component {

    defaultState = {
        show: false,
        type: 'alert',
        loading: false,
        header: false,
        content: false
    };

    constructor(props){
        super(props);
        this.state = this.defaultState;

        this.ref = React.createRef();
        this.handleClose = this.handleClose.bind(this);
        this.handleBtnCallback = this.handleBtnCallback.bind(this);
    }

    componentDidMount() {

        this.handleClose = this.handleClose.bind(this);
        this.handleBtnCallback = this.handleBtnCallback.bind(this);

        window.addEventListener('app.dialog', this.handleShow);
        window.addEventListener('app.dialog.show', this.handleShow);
        window.addEventListener('app.dialog.close', this.handleClose);
        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {

        window.removeEventListener('app.dialog', this.handleShow);
        window.removeEventListener('app.dialog.show', this.handleShow);
        window.removeEventListener('app.dialog.close', this.handleClose);
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleShow = async (e) => {
        if(e?.detail === null){
            return this.handleClose(e);
        }

        if(!e?.detail?.buttons){
            e.detail.buttons = [];
        }

        const cancel = {
            text: 'Хорошо',
            onClick: this.handleClose
        };

        if(e.detail?.buttons){
            e.detail.buttons.push(cancel);

            e.detail.buttons.forEach(function(button, i, arr) {
                arr[i].className = `btn d-block btn-primary ps-4 pe-4`;
                if((arr.length - 1) === i){
                    if(e.detail.buttons.length > 1){
                        arr[i].text = 'Отмена';
                        arr[i].className = (e.detail.buttons.length > 2) ? 'btn d-block btn-primary ps-4 pe-4' : 'btn d-block btn-secondary ps-4 pe-4';
                    }else{
                        arr[i].className = `btn d-block btn-primary w-100`;
                    }
                }
            });

            await this.setState((prevState) => ({
                ...prevState,
                ...e.detail,
                type: 'dialog',
                buttons: e.detail.buttons
            }));
        }

        await this.setState((prevState) => ({
            ...prevState,
            show: true
        }));
    };

    handleClose(e) {
        if(this.state?.onClose){
            this.state?.onClose(e);
        }
        return this.setState((prevState) => (this.defaultState));
    }

    handleBtnCallback = async (e, callback) => {
        e.persist();

        if(!callback){
            return await this.handleClose(e);
        }

        const result = await callback(e);
        if(typeof result === 'string'){
            window.dispatchEvent(new CustomEvent("app.dialog", { detail: {
                header: this.state.header,
                content: result,
            }}));
        }else{
            await this.handleClose(e);
        }
    };

    render() {

        return (
            <div className={`${this.state.show === false ? 'd-none' : 'd-block'}`}>

                <div className="modal-backdrop opacity-25" />

                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {this.state?.header === false ? null : (
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.state.header}</h5>
                                </div>
                            )}

                            {this.state?.content === false ? null : (
                                <div className="modal-body">
                                    <p>{this.state.content}</p>
                                </div>
                            )}

                            {this.state.type === 'alert' ? (
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Хорошо</button>
                                </div>
                            ) : (
                                <div className={"modal-footer"}>
                                    {this.state.buttons.map((button, index) => (
                                        <Button
                                            {...button}
                                            key={index}
                                            className={button.className}
                                            onClick={(e) => this.handleBtnCallback(e, button?.onClick)}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
