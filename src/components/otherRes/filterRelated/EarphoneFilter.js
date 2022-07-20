import React,{useState,useEffect} from "react";
import FormCBCollection from "../FormCBCollection";

export default function Earphone(props) {
	const [earphoneFilters, setEarphoneFilters] = useState({
		connectivity: [],
		type: [],
		brand: [],
	});

	const handleChange = event => {
		let { name, value } = event.target;
		let tempEarphoneFilters = { ...earphoneFilters };
		let tempEFArr = tempEarphoneFilters[name];
		tempEFArr.includes(value) ? tempEFArr.splice(tempEFArr.indexOf(value), 1) : tempEFArr.push(value);
		tempEarphoneFilters[name] = tempEFArr;
		setEarphoneFilters(tempEarphoneFilters);
	};

	useEffect((previousState)=>{
		props.updateParent(earphoneFilters);
	})

	const connectivity = ["Wired", "Wirless"];
	const type = ["Budd", "Buddless"];
	const brand = ["JBL", "Sony", "Sennheiser", "Beats", "Razer", "Other"];

	return (
		<React.Fragment>
			<FormCBCollection
				items={connectivity}
				name="connectivity"
				onchangeFun={handleChange}
				checkValueByParentArr={earphoneFilters.connectivity}
				className="gap-2 mb-2"
			/>
			<FormCBCollection
				items={type}
				name="type"
				onchangeFun={handleChange}
				checkValueByParentArr={earphoneFilters.type}
				className="gap-2 mb-2"
			/>
			<FormCBCollection
				items={brand}
				name="brand"
				onchangeFun={handleChange}
				checkValueByParentArr={earphoneFilters.brand}
				className="gap-2 mb-2"
			/>
		</React.Fragment>
	);
}
