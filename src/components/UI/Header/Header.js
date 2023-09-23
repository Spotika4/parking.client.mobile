import React from 'react';


export class Header extends React.Component {


    render() {

        return (
            <header className="shadow h-auto cursor-pointer">
                <div className={`container-fluid ${!this.props?.right || this.props?.right === false ? null : ( `d-flex justify-content-between` )}`}>

                    {!this.props?.onBackClick ? null : (
                        <h2 className={`d-flex align-items-center mb-3 mt-3`} onClick={this.props?.onBackClick}>
                            <i className="icon icon-chevron_left d-inline-block me-1" />
                            {this.props.title}
                        </h2>
                    )}

                    {!this.props?.onClick ? null : (
                        <h2 className={`d-flex align-items-center mb-3 mt-3 `} onClick={this.props?.onClick}>
                            {this.props.title}
                            <i className="icon icon-chevron_right d-inline-block me-1" />
                        </h2>
                    )}

                    {this.props?.onClick || this.props?.onBackClick ? null : (
                        <h2 className={`d-flex align-items-center mb-3 mt-3`}>
                            {this.props.title}
                        </h2>
                    )}

                    {this.props.children}

	                {!this.props?.right || this.props?.right === false ? null : ( <div className={"header-right"}> {this.props.right} </div> )}

                </div>
            </header>
        );
    }
}
