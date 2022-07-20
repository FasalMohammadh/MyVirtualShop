import React, { useState, useEffect } from "react";
import FormCBCollection from "../FormCBCollection";

export default function Charger(props) {
	const [chargerFilters, setChargerFilters] = useState({
		type: [],
		fastCharger: [],
		usbPorts: [],
		connectivity: [],
	});

	const handleChange = event => {
		let { name, value } = event.target;
		let tempChargerFilter = { ...chargerFilters };
		let tempCFArr = tempChargerFilter[name];
		tempCFArr.includes(value) ? tempCFArr.splice(tempCFArr.indexOf(value), 1) : tempCFArr.push(value);
		tempChargerFilter[name] = tempCFArr;
		setChargerFilters(tempChargerFilter);
	};

	useEffect(previousState => {
		props.updateParent(chargerFilters);
	});

	const type = ["Type-c", "MicroUsb", "Lightning"];
	const fastCharger = ["Yes", "No"];
	const usbPorts = ["1", "2", "3", "4"];
	const connectivity = ["Wired", "Wirless"];

	return (
		<React.Fragment>
			<FormCBCollection
				items={type}
				name="type"
				onchangeFun={handleChange}
				checkValueByParentArr={chargerFilters.type}
				className="gap-2 mb-2"
			/>
			<FormCBCollection
				items={fastCharger}
				name="fastCharger"
				onchangeFun={handleChange}
				checkValueByParentArr={chargerFilters.fastCharger}
				className="gap-2 mb-2"
			/>
			<FormCBCollection
				items={usbPorts}
				name="usbPorts"
				onchangeFun={handleChange}
				checkValueByParentArr={chargerFilters.usbPorts}
				className="gap-2 mb-2"
			/>
			<FormCBCollection
				items={connectivity}
				name="connectivity"
				onchangeFun={handleChange}
				checkValueByParentArr={chargerFilters.connectivity}
				className="gap-2 mb-2"
			/>
		</React.Fragment>
	);
}
