import React, {useState, useEffect} from "react";
import MultiSelect from "../multiSelect";
import {locationsArr} from "../locations";

const ByStoresFilter = ({updateParent}) => {
	const [selLoc, setSelLoc] = useState([]);

	const handleLocCheckChange = ({target}) => {
		let {value, checked} = target;
		const tempSelLoc = [...selLoc];
		checked
			? tempSelLoc.push(value)
			: tempSelLoc.splice(tempSelLoc.indexOf(value), 1);

		setSelLoc(tempSelLoc);
	};

	useEffect(() => updateParent(selLoc), [selLoc]);

	return (
		<MultiSelect
			items={locationsArr}
			onChange={handleLocCheckChange}
			valueArr={selLoc}
			className="border border-dark border-2 rounded-3"
		/>
	);
};

export default ByStoresFilter;


	/*<div className="px-4 gap-2 d-flex align-items-center border border-dark border-2 rounded-3">
				<h3 className="mb-0">Search</h3>
				<input type="search" className="form-control-lg form-control" />
				<i class="fa-solid fa-magnifying-glass fa-2x" role="button" />
			</div>*/

