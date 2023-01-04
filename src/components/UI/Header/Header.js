import React from 'react';


export class Header extends React.Component {


    render() {

        return (
            <header className="shadow">
                <div className="container-fluid">

                    {!this.props?.onBackClick ? null : (
                        <h1 className={`d-flex align-items-center`} onClick={this.props?.onBackClick}>
                            <i className="icon icon-chevron_left d-inline-block" />
                            {this.props.title}
                        </h1>
                    )}

                    {!this.props?.onClick ? null : (
                        <h1 className={`d-flex align-items-center`} onClick={this.props?.onClick}>
                            {this.props.title}
                            <i className="icon icon-chevron_right d-inline-block" />
                        </h1>
                    )}

                    {this.props?.onClick || this.props?.onBackClick ? null : (
                        <h1 className={`d-flex align-items-center`}>
                            {this.props.title}
                        </h1>
                    )}

                    {this.props.children}

                </div>
            </header>
        );
    }
}
