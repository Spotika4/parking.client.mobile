import React from 'react';

import { Form } from "./Form";


export class Input extends React.Component {


	render(){
		return (
			<input
				type="text"
				autoComplete="off"
				className={'form-control'}
				readOnly={this.props.readOnly}
				disabled={this.props.disabled}
				placeholder={this.props.placeholder}
				value={this.props.value || ''}
				onChange={() => { return false }}
				onClick={(e) => {
					this.props.context.widget({
						header: false,
						child: () => (
							<Form
								context={this.props.context}
								header={this.props.title}
								onlyOne={this.props.onlyOne}
								onClear={this.props.onClear}
								onPick={this.props.onPick}
								picked={this.props.picked}
								value={this.props.value || ''}
								model={this.props.model}
								params={this.props.params}
							/>
						)
					});
				}}
			/>
		);
	}
}
