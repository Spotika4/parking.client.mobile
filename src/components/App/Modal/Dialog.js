import React from 'react';


export class Dialog extends React.Component {


    constructor(props){
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.handleClose = this.handleClose.bind(this);
        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleClose(e) {
        this.props.handle({
            show: false,
            type: 'alert',
            loading: false,
            header: false,
            content: false
        });
    }

    render() {

        return (
            <div className={`${this.props.show === false ? 'd-none' : 'd-block'}`}>

                <div className="modal-backdrop opacity-25" />

                <div className="modal fade show d-block">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            {this.props?.header === false ? null : (
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.props.header}</h5>
                                </div>
                            )}

                            {this.props?.content === false ? null : (
                                <div className="modal-body">
                                    <p>{this.props.content}</p>
                                </div>
                            )}

                            {!this.props?.type || this.props.type !== 'alert' ? null : (
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={this.handleClose}>Хорошо</button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
