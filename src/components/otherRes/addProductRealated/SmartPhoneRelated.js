import React, { Component } from "react";
import TextBox from "../TextBox.js";
import FormRBCollection from "../FormRBCollection";
import FormCBCollection from "../FormCBCollection";
import FormSelect from "../FormSelect";

let allBrands = [
	"Samsung",
	"Apple",
	"Huawei",
	"Nokia",
	"Sony",
	"LG",
	"Lenovo",
	"Xiaomi",
	"Google",
	"Honor",
	"Oppo",
	"Realme",
	"OnePlus",
	"vivo",
	"Meizu",
];

let sensors = [
	"Accelerometer",
	"Gyroscope",
	"Compass",
	"Biometric",
	"AmbientLight",
];

let memory = ["1GB", "2GB", "3GB", "4GB", "5GB", "6GB", "6GB+"];
let storage = ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "512GB+"];
let rearCam = ["8MP", "16MP", "32MP", "48MP", "48MP+"];
let frntCam = ["5MP", "8MP", "16MP", "32MP", "32MP+"];
let battery = [
	"2500MAH",
	"3000MAH",
	"3500MAH",
	"4000MAH",
	"5000MAH",
	"5000MAH+",
];

export default class SmartPhoneRelated extends Component {
	constructor(props) {
		super(props);
		this.state = {
			year: "",
			model: "",
			brand: allBrands[0],
			memory: memory[0],
			storage: storage[0],
			battery: battery[0],
			frntCam: "",
			rearCam: "",
			sensors: [],
		};
	}

	//arrow fuction is used so that we dont need to bind this to handlChange
	handleChange = (event) =>
		this.setState({ [event.target.name]: event.target.value });

	//give states to parent
	componentDidUpdate = () => this.props.updateParent(this.state);

	handleChangeCheckBoxes = ({ target }) => {
		let tempSensors = [...this.state.sensors],
			val = target.value;
		tempSensors.includes(val)
			? tempSensors.splice(tempSensors.indexOf(val), 1)
			: tempSensors.push(val);

		this.setState({ sensors: tempSensors });
	};

	render() {
		return (
			<div className="gap-3 bg-white rounded-3 p-0 container-fluid d-flex flex-column">
				<TextBox
					type="text"
					title="Model"
					icon="fa-solid fa-mobile-screen-button"
					onchangeFun={this.handleChange}
					value={this.state.model}
					name="model"
					className="col-12"
				/>
				<TextBox
					type="Number"
					title="Year"
					icon="fa-solid fa-calendar-check"
					onchangeFun={this.handleChange}
					value={this.state.year}
					name="year"
					className="col-12"
				/>

				<FormSelect
					items={allBrands}
					title="Brand"
					name="brand"
					value={this.state.brand}
					onchangeFun={this.handleChange}
				/>

				<FormSelect
					title="Memory"
					name="memory"
					items={memory}
					onchangeFun={this.handleChange}
					value={this.state.memory}
				/>
				<FormSelect
					title="Stroage"
					name="storage"
					items={storage}
					onchangeFun={this.handleChange}
					value={this.state.storage}
				/>
				<FormSelect
					title="Battery Capacity"
					name="battery"
					items={battery}
					onchangeFun={this.handleChange}
					value={this.state.battery}
				/>
				<FormRBCollection
					title="Front Camera"
					name="frntCam"
					items={frntCam}
					onchangeFun={this.handleChange}
					value={this.state.frntCam}
				/>
				<FormRBCollection
					title="Rear Camera"
					name="rearCam"
					items={rearCam}
					onchangeFun={this.handleChange}
					value={this.state.rearCam}
				/>

				<FormCBCollection
					name="sensors"
					items={sensors}
					checkValueByParentArr={this.state.sensors}
					onchangeFun={this.handleChangeCheckBoxes}
					className="gap-3"
				/>
			</div>
		);
	}
}

// function Sensors(props) {
// 	return (
// 		<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 			<h4 className="align-self-center">Sensors</h4>
// 			{sensors.map(sensor => (
// 				<div key={sensor} className="form-check flex-fill">
// 					<input
// 						name={sensor}
// 						className="form-check-input"
// 						type="checkbox"
// 						checked={props.selSensors[sensor]}
// 						id={sensor}
// 						value={sensor}
// 						onChange={props.onchangeFun}
// 					/>
// 					<label className="form-check-label" htmlFor={sensor}>
// 						{sensor}
// 					</label>
// 				</div>
// 			))}
// 		</div>
// 	);
// 	// }
// }

// class Memory extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { selMem: "" };
// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	handleChange(e) {
// 		this.setState({ selMem: e.target.value });
// 	}

// 	render() {
// 		return (
// 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 				<h4 className="align-self-center">Memory</h4>
// 				{mem.map((oneMem) => (
// 					<div className="form-check flex-fill">
// 						<input
// 							name="Memory"
// 							className="form-check-input"
// 							type="radio"
// 							checked={this.state.selMem === oneMem}
// 							id={oneMem}
// 							value={oneMem}
// 							onChange={this.handleChange}
// 						/>
// 						<label className="form-check-label" htmlFor={oneMem}>
// 							{oneMem}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }

// // class Storage extends Component {
// // 	constructor(props) {
// // 		super(props);
// // 		this.state = {
// // 			selStrg: "",
// // 		};
// // 		this.handleChange = this.handleChange.bind(this);
// // 	}

// // 	handleChange(e) {
// // 		this.setState({ selStrg: e.target.value });
// // 	}

// // 	render() {
// // 		return (
// // 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// // 				<h4 className="align-self-center">Storage</h4>
// // 				{strg.map((oneStrg) => (
// // 					<div className="form-check flex-fill">
// // 						<input
// // 							name="Storage"
// // 							className="form-check-input"
// // 							type="radio"
// // 							checked={this.state.selStrg === oneStrg}
// // 							id={oneStrg}
// // 							value={oneStrg}
// // 							onChange={this.handleChange}
// // 						/>
// // 						<label className="form-check-label" htmlFor={oneStrg}>
// // 							{oneStrg}
// // 						</label>
// // 					</div>
// // 				))}
// // 			</div>
// // 		);
// // 	}
// // }

// class Battery extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selBtr: "",
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	handleChange(e) {
// 		this.setState({ selBtr: e.target.value });
// 	}

// 	render() {
// 		return (
// 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 				<h4 className="align-self-center">Battery Capacity</h4>
// 				{btr.map((onebtr) => (
// 					<div className="form-check flex-fill">
// 						<input
// 							name="Battery"
// 							className="form-check-input"
// 							type="radio"
// 							checked={this.state.selBtr === onebtr}
// 							id={onebtr}
// 							value={onebtr}
// 							onChange={this.handleChange}
// 						/>
// 						<label className="form-check-label" htmlFor={onebtr}>
// 							{onebtr}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }

// class FrntCam extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selFrntCam: "",
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	handleChange(e) {
// 		this.setState({ selFrntCam: e.target.value });
// 	}

// 	render() {
// 		return (
// 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 				<h4 className="align-self-center">Front Camera</h4>
// 				{frntCam.map((oneFrntCam) => (
// 					<div className="form-check flex-fill">
// 						<input
// 							name="Front"
// 							className="form-check-input"
// 							type="radio"
// 							checked={this.state.selFrntCam === oneFrntCam}
// 							id={oneFrntCam}
// 							value={oneFrntCam}
// 							onChange={this.handleChange}
// 						/>
// 						<label className="form-check-label" htmlFor={oneFrntCam}>
// 							{oneFrntCam}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }

// class RearCam extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			selRearCam: "",
// 		};
// 		this.handleChange = this.handleChange.bind(this);
// 	}

// 	handleChange(e) {
// 		this.setState({ selRearCam: e.target.value });
// 	}

// 	render() {
// 		return (
// 			<div className="justify-content-between bg-white category rounded-3 p-2 container-fluid d-flex flex-wrap">
// 				<h4 className="align-self-center">Rear Camera</h4>
// 				{rearCam.map((oneRearCam) => (
// 					<div className="form-check flex-fill">
// 						<input
// 							name="Rear"
// 							className="form-check-input"
// 							type="radio"
// 							checked={this.state.selRearCam === oneRearCam}
// 							id={oneRearCam}
// 							value={oneRearCam}
// 							onChange={this.handleChange}
// 						/>
// 						<label className="form-check-label" htmlFor={oneRearCam}>
// 							{oneRearCam}
// 						</label>
// 					</div>
// 				))}
// 			</div>
// 		);
// 	}
// }

// constructor(props) {
// 	super(props);
// 	this.state = {
// 		Accelerometer: false,
// 		Gyroscope: false,
// 		Compass: false,
// 		Biometric: false,
// 		AmbientLight: false,
// 	};
// 	// sensors.map(sensor=>{this.setState([sensor]:false)});
// 	this.handleChange = this.handleChange.bind(this);
// }

// render() {
