import React from 'react';

import { Scroller } from "../../../UI";


export class List extends React.Component {


    render(){

        return (
            <Scroller>
                <div className={'p-3 rounded shadow'}>
	                {!this.props?.EMAIL ? null : (
		                <div className="d-flex justify-content-between mb-3 align-content-center">
			                <div className="d-flex align-items-center">
                            <span className="rounded-pill text-center fs-2 me-4">
                                <i className="icon-mail_outline" />
                            </span>
				                <div className="d-block">
					                <a href={`mailto:${this.props?.EMAIL}`} className="text-decoration-none">
						                {this.props?.EMAIL}
					                </a>
				                </div>
			                </div>
		                </div>
	                )}
	                {!this.props?.PERSONAL_PHONE ? null : (
		                <div className="d-flex justify-content-between mb-3 align-content-center">
			                <div className="d-flex align-items-center">
	                            <span className="rounded-pill text-center fs-2 me-4">
	                                <i className="icon-phone_enabled" />
	                            </span>
				                <div className="d-block">
					                <a href={`tel:${this.props?.PERSONAL_PHONE?.replace(/[()\s\-]/g,"")}`} className="text-decoration-none">
						                {this.props?.PERSONAL_PHONE}
					                </a>
				                </div>
			                </div>
		                </div>
	                )}
	                {!this.props?.MAP?.NAME ? null : (
		                <div className="d-flex justify-content-between mb-3 align-content-center">
			                <div className="d-flex align-items-center">
                            <span className="rounded-pill text-center fs-2 me-4">
                                <i className="icon-location_on" />
                            </span>
				                <div className="d-block">
					                {!this.props?.SERVICE?.NAME ? `` : `${this.props?.SERVICE?.NAME}, `}
					                {!this.props?.MAP?.NAME ? `` : this.props?.MAP?.NAME}
				                </div>
			                </div>
		                </div>
	                )}
                </div>
            </Scroller>
        );
    }
}
