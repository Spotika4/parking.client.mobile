import React from 'react';


export class Stick extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            show: false,
            text: false,
            icon: false,
            timerId: false
        };

        this.ref = React.createRef();

        this.handleShow = this.handleShow.bind(this);
    }

    componentDidMount() {
        this.handleShow = this.handleShow.bind(this);
        window.addEventListener('app.stick', this.handleShow);

        this.setState((prevState) => ({
            ...prevState,
        }));
    }

    componentWillUnmount() {
        window.removeEventListener('app.stick', this.handleShow);
        this.setState = (state, callback) => {
            return false;
        }
    }

    handleShow = async (e) => {
        if(this.state.timerId !== false){
            clearTimeout(this.state.timerId);
        }

        this.ref.current.classList.remove('d-none');

        await this.setState((prevState) => ({
            ...prevState,
            text: e.detail?.text,
            icon: e.detail?.icon
        }));

        let timerId = setTimeout(async () => {
            this.ref.current.classList.add('d-none');
        }, 2500);

        await this.setState((prevState) => ({
            ...prevState,
            timerId: timerId
        }));
    };

    render() {

        return (
            <div ref={this.ref} className={`stick position-absolute d-flex p-3 shadow d-flex d-none`}>
                <div>
                    <i className={`icon icon-directions_car`} />
                </div>
                <div>
                    {this.state.text}
                </div>
            </div>
        );
    }
}
