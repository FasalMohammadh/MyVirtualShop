import React, { useState, useEffect } from "react";
import FormCBCollection from "../FormCBCollection";

export default function Feature(props) {
	const [featureFilters, setFeatureFilters] = useState({
		connectivity: [],
		brand: [],
	});

	const connectivity = ["2G", "3G", "4G", "Bluetooth", "Wifi"];
	const brand = ["Nokia", "Intex", "MicroMax", "SonyEricson", "Other"];

	const handleChange = (event) => {
		let { name, value } = event.target;
		let tempFeatureFilters = { ...featureFilters };
		let tempFFArr = tempFeatureFilters[name];
		tempFFArr.includes(value)
			? tempFFArr.splice(tempFFArr.indexOf(value), 1)
			: tempFFArr.push(value);
		tempFeatureFilters[name] = tempFFArr;
		setFeatureFilters(tempFeatureFilters);
	};

	useEffect((previousState) => props.updateParent(featureFilters));

	return (
		<React.Fragment>
			<FormCBCollection
				items={brand}
				name="brand"
				onchangeFun={handleChange}
				checkValueByParentArr={featureFilters.brand}
				className="gap-2 mb-2 "
			/>
			<FormCBCollection
				items={connectivity}
				name="connectivity"
				onchangeFun={handleChange}
				checkValueByParentArr={featureFilters.connectivity}
				className="gap-2 mb-2"
			/>
		</React.Fragment>
	);
}
