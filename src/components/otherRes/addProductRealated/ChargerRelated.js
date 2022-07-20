import React, { useEffect, useState } from "react";
import FormRBCollection from "../FormRBCollection";

export default function ChargerRelated(props)
{
	const [selected, setSelected] = useState({
		fastCharger: "",
		usbPorts: "",
		connectivity: "",
		type: "",
	});

	let types = ["Type-c", "MicroUsb", "Lightning"];
	let fastCharger = ["Yes", "No"];
	let usbPorts = ["1", "2", "3", "4"];
	let connectivity = ["Wired", "Wirless"];

	let handleChange = event =>
	{
		let { value, name } = event.target,
			tempSelected = { ...selected };
		tempSelected[name] = value;
		setSelected(tempSelected);
	};

	useEffect(()=>props.updateParent(selected));
		
	return (
		<div className="d-flex flex-column gap-3">
			<FormRBCollection
				items={types}
				name="type"
				title="Type"
				value={selected.type}
				onchangeFun={handleChange}
			/>
			<FormRBCollection
				items={fastCharger}
				name="fastCharger"
				title="Fast Charger"
				value={selected.fastCharger}
				onchangeFun={handleChange}
			/>
			<FormRBCollection
				items={usbPorts}
				name="usbPorts"
				title="No Of Usb Ports"
				value={selected.usbPorts}
				onchangeFun={handleChange}
			/>
			<FormRBCollection
				items={connectivity}
				name="connectivity"
				title="Connectivity"
				value={selected.connectivity}
				onchangeFun={handleChange}
			/>
		</div>
	);
}
