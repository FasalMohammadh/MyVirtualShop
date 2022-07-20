import React from "react";

export default function FormRBCollection(props) {
	return (
		<div className={`${props.className} p-0 justify-content-between gap-3 bg-white category rounded-3 d-flex flex-wrap`}>
			<h4 className="align-self-center mb-0">{props.title}</h4>
			{
				//similar to forEach allow us to perform a method on each array item
				props.items.map(item => (
					<div
						className="border border-2 form-check flex-fill d-flex gap-2 justify-content-center"
						key={item}
					>
						<input
							name={props.name}
							className="form-check-input"
							type="radio"
							checked={props.value === item}
							value={item}
							onChange={props.onchangeFun}
							id={props.items.indexOf(item)+item}
						/>
						<label
							className="form-check-label cursor-pointer"
							htmlFor={props.items.indexOf(item)+item}
						>
							{item}
						</label>
					</div>
				))
			}
		</div>
	);
}


	//created an state and setstate method using hooks
	// const [selected, setSelected] = useState("");

	//when user click on radio button that RB value is loaded to state
	// function handleChange(e) {
	// 	setSelected(e.target.value);
	// 	props.giveToParent(e.target.value);
	// }

	// let handleClick = (event) => {
	// 	// event.target.previousElementSibling.dispatchEvent(new Event("change"));
	// };