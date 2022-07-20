import React, { useState, useRef, useEffect } from "react";
import TextBox from "./TextBox";
import FormCBCollection from "./FormCBCollection";
import SmartPhoneFilter from "./filterRelated/SmartPhoneFilter";
import FeaturePhoneFilter from "./filterRelated/FeaturePhoneFilter";
import ChargerFilter from "./filterRelated/ChargerFilter";
import EarphoneFilter from "./filterRelated/EarphoneFilter";

export default function ProductFilter(props) {
	// default state object for common filters
	const [selected, setSelected] = useState({
		category: [],
		maxPrice: "",
		minPrice: "",
	});
	const childStateObj = useRef({});

	const resetClicked = useRef(false);

	//use effect will always run when component update if we pass second parameter
	// it only runs when component update and second parameter change
	useEffect(() => {
		if (resetClicked.current) {
			handleSubmit();
			resetClicked.current = false;
		}
	}, [selected]);

	//this array is used to form combo boxes of category
	const category = [
		"SmartPhone",
		"FeaturePhone",
		"Charger",
		"Earphone",
		"Other",
	];

	//only for small screen devices
	const [showFilters, setShowFilters] = useState(false);

	//to handle state of category combo box
	const handleChange = (event) => {
		let { name, value } = event.target;
		let tempSelected = { ...selected };
		tempSelected[name].includes(value)
			? tempSelected[name].splice(tempSelected[name].indexOf(value), 1)
			: tempSelected[name].push(value);
		setSelected(tempSelected);
	};

	//to handle min and max price states
	let handleChangeTextBox = (event) => {
		let { value, name } = event.target;
		setSelected((prevSelected) => {
			let tempSelected = { ...prevSelected };
			tempSelected[name] = value;
			return tempSelected;
		});
	};

	const getChildrenStates = (obj) => {
		childStateObj.current = { ...obj };
	};

	//according to category state extra filters is loaded
	let extraFilters = () => {
		if (selected.category.length === 1) {
			if (selected.category.includes("SmartPhone")) {
				return <SmartPhoneFilter updateParent={getChildrenStates} />;
			} else if (selected.category.includes("FeaturePhone")) {
				return <FeaturePhoneFilter updateParent={getChildrenStates} />;
			} else if (selected.category.includes("Earphone")) {
				return <EarphoneFilter updateParent={getChildrenStates} />;
			} else if (selected.category.includes("Charger")) {
				return <ChargerFilter updateParent={getChildrenStates} />;
			}
		}
	};

	//to handle apply filters this will give all states to parent and execute parent function
	let handleSubmit = () => {
		let filterObject = { ...childStateObj.current, ...selected };
		props.submit(filterObject);
	};

	//reset to default
	let handleReset = () => {
		setSelected({
			category: [],
			maxPrice: "",
			minPrice: "",
		});
		resetClicked.current = true;
	};

	return (
		<React.Fragment>
			<div className="px-3 d-flex d-md-block justify-content-between align-items-center pt-2">
				<h3 className="text-center fw-bold m-0">Filters</h3>
				<i
					className="d-md-none fa-solid fa-bars fa-2x"
					onClick={() => setShowFilters((prevState) => !prevState)}
				/>
			</div>
			<div
				className={`row p-4 ${
					showFilters ? "d-block" : "d-none"
				} d-md-block `}
			>
				<TextBox
					onchangeFun={handleChangeTextBox}
					name="minPrice"
					value={selected.minPrice}
					title="Minimum Price"
					type="number"
					className="mb-2"
				/>

				<TextBox
					onchangeFun={handleChangeTextBox}
					name="maxPrice"
					value={selected.maxPrice}
					title="Maximum Price"
					type="number"
					className="mb-2"
				/>

				<FormCBCollection
					items={category}
					name="category"
					onchangeFun={handleChange}
					checkValueByParentArr={selected.category}
					className="gap-2 mb-2"
				/>

				{extraFilters()}

				<div className="btn-group p-0">
					<button
						className="btn d-inline btn-primary"
						onClick={handleSubmit}
					>
						Apply Filters
					</button>
					<button
						className="btn d-inline btn-warning"
						onClick={handleReset}
					>
						Reset Filters
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}
