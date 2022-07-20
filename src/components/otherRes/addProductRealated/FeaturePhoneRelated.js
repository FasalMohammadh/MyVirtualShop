import React, { Component } from "react";
import TextBox from "../TextBox.js";
import FormCBCollection from "../FormCBCollection";
import FormSelect from "../FormSelect";

let allBrands = ["Nokia", "Intex", "MicroMax", "SonyEricson", "other"];
let connectivity = ["2G", "3G", "4G", "Bluetooth", "Wifi"];

export default class FeaturePhoneRelated extends Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			brand: allBrands[0],
			connectivity: [],
			standby: "",
		};
	}

	handleChangeSelectAndText = event => this.setState({ [event.target.name]: event.target.value });

	handleChangeCheckBoxes = event =>
	{
		let val = event.target.value,
			tempConnectivity = [...this.state.connectivity];
		tempConnectivity.includes(val)
			? tempConnectivity.splice(tempConnectivity.indexOf(val), 1)
			: tempConnectivity.push(val);

		this.setState({ connectivity: tempConnectivity });
	};

	componentDidUpdate = () => this.props.updateParent(this.state);

	render()
	{
		return (
			<div className='gap-3 bg-white rounded-3 p-0 container-fluid d-flex flex-column'>
				<FormSelect
					title="Brand"
					value={this.state.selBrand}
					onChange={this.handleChangeSelectAndText}
					name='brand'
					items={allBrands} />

				<TextBox
					type='number'
					title='Standby(days)'
					icon='fa-solid fa-calendar-days'
					name='standby'
					value={this.state.standby}
					onchangeFun={this.handleChangeSelectAndText}
					className="col-12"
				/>

				<FormCBCollection
					name='connectivity'
					items={connectivity}
					onchangeFun={this.handleChangeCheckBoxes}
					checkValueByParentArr={this.state.connectivity}
					className="gap-3"
				/>
			</div>
		);
	}
}

// export default function FeaturePhoneRelated() {
// 	const [selBrand, setSelBrand] = useState("Nokia");
// 	const [sel2G, setSel2G] = useState(false);
// 	const [sel3G, setSel3G] = useState(false);
// 	const [sel4G, setSel4G] = useState(false);
// 	const [selBlutooth, setSelBlutooth] = useState(false);
// 	const [selWifi, setSelWifi] = useState(false);

// 	let changeHandler = (e) => setSelBrand(e.target.value);

// 	let handleChange = (e) => setSelConnectivity({[`${e.target.name}`]:!selConnectivity[`${e.target.name}`]});

// 	return (
// 		<div className="justify-content-between bg-white rounded-3 p-2 container-fluid d-flex flex-column">
// 			<div className="m-2">
// 				<h3 className="align-self-center">Brand</h3>
// 				<select
// 					className="form-select form-select-lg border-dark border-2"
// 					value={selBrand}
// 					onChange={changeHandler}
// 				>
// 					{allBrands.map((brand) => (
// 						<option value={brand}>{brand}</option>
// 					))}
// 				</select>
// 			</div>

// 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 				<h4 className="align-self-center">Connectivity</h4>
// 				{connectivity.map((item) => (
// 					<div className="form-check flex-fill">
// 						<input
// 							name={item}
// 							className="form-check-input"
// 							type="checkbox"
// 							checked={sel[`${item}`]}
// 							id={item}
// 							onChange={handleChange}
// 						/>
// 						<label className="form-check-label" htmlFor={item}>
// 							{item}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 			<TextBox
// 				type="number"
// 				title="Standby(days)"
// 				icon="fa-solid fa-calendar-days"
// 			/>
// 		</div>
// 	);
// }
