import React, { useState,useEffect } from "react";
import FormRBCollection from "../FormRBCollection";

let connectivity = ["Wired", "Wirless"];
let types = ["Budd", "Buddless"];
let brands = ["JBL", "Sony", "Sennheiser", "Beats", "Razer", "Other"];

export default function EarphoneRelated(props) {
	const [selected, setSelected] = useState({
		brand: "",
		type: "",
		connectivity: "",
	});

	let handleChange = event => {
		let { value, name } = event.target;
		let tempSelected = { ...selected };
		tempSelected[name] = value;
		setSelected(tempSelected);
	};

	useEffect(()=>props.updateParent(selected));

	return (
		<React.Fragment>
			<FormRBCollection
				items={brands}
				name='brand'
				title='Brand'
				value={selected.brand}
				onchangeFun={handleChange}
			/>
			<FormRBCollection
				items={types}
				name='type'
				title='Type'
				value={selected.type}
				onchangeFun={handleChange}
			/>
			<FormRBCollection
				items={connectivity}
				name='connectivity'
				title='Connectivity'
				value={selected.connectivity}
				onchangeFun={handleChange}
			/>
		</React.Fragment>
	);
}
