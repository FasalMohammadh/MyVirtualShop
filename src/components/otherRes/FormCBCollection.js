import React from "react";

export default function FormCBCollection(props) {
	return (
		<div
			className={`p-0 justify-content-between bg-white category rounded-3 d-flex flex-wrap ${props.className}`}>
			<h4 style={{ textTransform: "capitalize" }} className="align-self-center mb-0">
				{props.name}
			</h4>
			{props.items.map(item => (
				<div key={item} className="border border-2 form-check flex-fill d-flex justify-content-center gap-2">
					<input
						name={props.name}
						className="form-check-input"
						type="checkbox"
						checked={props.checkValueByParentArr.includes(`${item}`)}
						id={item + props.items.indexOf(item)}
						value={item}
						onChange={props.onchangeFun}
					/>
					<label className="form-check-label" htmlFor={item + props.items.indexOf(item)}>
						{item}
					</label>
				</div>
			))}
		</div>
	);
}
