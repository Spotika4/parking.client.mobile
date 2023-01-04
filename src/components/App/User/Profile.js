import React from 'react';

import { Context } from "../Context";
import { User } from "../Object";


export class Profile extends React.Component {

    static contextType = Context;


    constructor(props){
        super(props);

        this.state = {
            id: props.id
        };
    }

    componentDidMount = async () => {
        return await User.get({id: this.state.id}).then(async (result) => {
            if(result.success === true){
                await this.setState((prevState) => ({
                    ...prevState,
                    ...result.data
                }));
            }

            return result.success;
        });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return false;
        }
    }

    render(){

        return (
            <div className={'scroller'}>
                <div className={'p-3 vw-100'}>
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <div className="d-flex align-items-center">
                            <span className="rounded-pill text-center fs-2 me-4">
                                <i className="icon-mail_outline" />
                            </span>
                            <div className="d-block">
                                <a href="#" className="text-decoration-none">{this.state?.EMAIL}</a>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <div className="d-flex align-items-center">
                            <span className="rounded-pill text-center fs-2 me-4">
                                <i className="icon-phone_enabled" />
                            </span>
                            <div className="d-block">
                                <a href={`tel:${this.state?.PERSONAL_PHONE?.replace(/[\(\)\s\-]/g,"")}`} className="text-decoration-none">{this.state?.PERSONAL_PHONE}</a>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mb-3 align-content-center">
                        <div className="d-flex align-items-center">
                            <span className="rounded-pill text-center fs-2 me-4">
                                <i className="icon-location_on" />
                            </span>
                            <div className="d-block">
                                МКЦ, Транспортная территория, 6
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
