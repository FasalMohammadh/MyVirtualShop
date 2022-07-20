import React, { useState, useEffect } from "react";
import FormCBCollection from "../FormCBCollection";

export default function Smart(props) {
	const [smartFilters, setSmartFilters] = useState({
		brand: [],
		memory: [],
		storage: [],
		rearCamera: [],
		frontCamera: [],
		battery: [],
	});

	const handleChange = (event) => {
		let { name, value } = event.target;
		let tempSmartFilter = { ...smartFilters };
		let tempSFArr = tempSmartFilter[name];
		tempSFArr.includes(value)
			? tempSFArr.splice(tempSFArr.indexOf(value), 1)
			: tempSFArr.push(value);
		tempSmartFilter[name] = tempSFArr;
		setSmartFilters(tempSmartFilter);
	};

	useEffect((previousState) => {
		props.updateParent(smartFilters);
	});

	const obj = {
		brand: [
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
			"Vivo",
			"Meizu",
		],
		memory: ["1GB", "2GB", "3GB", "4GB", "5GB", "6GB", "6GB+"],
		storage: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "512GB+"],
		rearCamera: ["8MP", "16MP", "32MP", "48MP", "48MP+"],
		frontCamera: ["5MP", "8MP", "16MP", "32MP", "32MP+"],
		battery: [
			"2500MAH",
			"3000MAH",
			"3500MAH",
			"4000MAH",
			"5000MAH",
			"5000MAH+",
		],
	};

	const formAllCBFromObj = () => {
		let allCBCollection = [];
		Object.entries(obj).forEach(([ name, valArr ]) => {
			allCBCollection.push(
				<FormCBCollection
					key={name}
					items={valArr}
					name={name}
					onchangeFun={handleChange}
					checkValueByParentArr={smartFilters[name]}
					className="gap-2 mb-2 "
				/>
			);
		});
		return allCBCollection;
	};

	return <React.Fragment>{formAllCBFromObj()}</React.Fragment>;
}

/*
		<FormCBCollection
				items={memory}
				name="memory"
				onchangeFun={props.onchangeFun}
				checkValueByParentArr={props.checkValueByParentArr.memory}
			/>
			<FormCBCollection
				items={storage}
				name="storage"
				onchangeFun={props.onchangeFun}
				checkValueByParentArr={props.checkValueByParentArr.storage}
			/>
			<FormCBCollection
				items={rearCam}
				name="rearCamera"
				onchangeFun={props.onchangeFun}
				checkValueByParentArr={props.checkValueByParentArr.rearCamera}
			/>
			<FormCBCollection
				items={frntCam}
				name="frontCamera"
				onchangeFun={props.onchangeFun}
				checkValueByParentArr={props.checkValueByParentArr.frontCamera}
			/>
			<FormCBCollection
				items={battery}
				name="battery"
				onchangeFun={props.onchangeFun}
				checkValueByParentArr={props.checkValueByParentArr.battery}
			/>
*/
