import React from 'react';

import { Spinner } from "../../UI";

import { Button } from "./Button";


export class Dialog extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

        return (
            <>

                <div className={`modal-backdrop opacity-25 ${this.props.show === false ? `d-none` : `d-block`}`} />

                <div className={`modal align-items-center d-flex fade ${this.props.show === false ? `z-index--1` : `show active`}`}>

                    <div className={`modal-dialog w-100 fade ${this.props.show === false ? `` : `show active`}`}>

                        <div className="modal-content">

                            {this.props?.header === false ? null : (
                                <div className="modal-header">
                                    <h5 className="modal-title">{this.props.header}</h5>
                                </div>
                            )}

                            {this.props.loading === true || this.props.type === "loading" ? (
	                            <div className="modal-body">
		                            <Spinner />
	                            </div>
                            ) : (
	                            <>
			                        <div className="modal-body">
				                        {this.props?.content === false ? this.props?.child && this.props?.child() : this.props.content}
			                        </div>

			                        {this.props.footer === false ? null : (
				                        <div className={"modal-footer"}>
					                        {!this.props.buttons || this.props.buttons.length === 0 ? null : (
						                        this.props.buttons.map((button, index) => (
							                        <Button
								                        {...button}
								                        key={index}
								                        className={button.className}
							                        />
						                        ))
					                        )}
				                        </div>
			                        )}
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </>
        );
    }
}
