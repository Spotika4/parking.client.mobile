import React from 'react';

import { Header, Scroller } from "../../components/UI";
import { Context } from "../../components/App/Context";


export class Info extends React.Component {

	static contextType = Context;


	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentWillUnmount() {
		return this.setState = (state, callback) => {
			return false;
		}
	}

	localStorageInfo(){
		let info = {
			rows: [],
			total: 0
		};
		let size, key;
		for (key in localStorage) {
			if (!localStorage.hasOwnProperty(key)) {
				continue;
			}
			size = ((localStorage[key].length + key.length) * 2);
			info.total += size;
			info.rows.push({
				key: key,
				size: (size / 1024).toFixed(2)
			});
		}
		info.total = (info.total / 1024).toFixed(2);
		return info;
	}

	render() {

		const device = window.device;
		const info = this.localStorageInfo();

		return (
			<>
				<Header title={`Об устройстве`} onBackClick={() => this.props.history.push(`/settings/options`)} />

				<main>
					<Scroller>
						<h5>Device info</h5>
						<table className="table table-bordered w-100">
							<tbody>
								<tr>
									<th>Name</th>
									<td className={"text-right"}>{`${device.model}`}</td>
								</tr>
								<tr>
									<th>Platform</th>
									<td className={"text-right"}>{`${device.platform}`}</td>
								</tr>
								<tr>
									<th>UUID</th>
									<td className={"text-right"}>{`${device.uuid}`}</td>
								</tr>
								<tr>
									<th>Version</th>
									<td className={"text-right"}>{`${device.version}`}</td>
								</tr>
								<tr>
									<th>Manufacturer</th>
									<td className={"text-right"}>{`${device.manufacturer}`}</td>
								</tr>
								<tr>
									<th>Serial</th>
									<td className={"text-right"}>{`${device.serial}`}</td>
								</tr>
								<tr>
									<th>Cordova</th>
									<td className={"text-right"}>{`${device.cordova}`}</td>
								</tr>
							</tbody>
						</table>
						<h5>Local Storage</h5>
						<table className="table table-bordered w-100">
							<tbody>
								{info.rows.map((item, index) => (
									<tr key={index}>
										<th>{item.key}</th>
										<td className={"text-right"}>{`${item.size} KB`}</td>
									</tr>
								))}
							</tbody>
							<tfoot>
								<tr>
									<th className={"text-right"} colSpan={"2"}>{`${info.total} KB`}</th>
								</tr>
							</tfoot>
						</table>
					</Scroller>
				</main>
			</>
		);
	}
}
