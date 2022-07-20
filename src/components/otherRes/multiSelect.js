import React, {useState, useEffect} from "react";
import "../css/multiSelect.css";

export default function MultiSelect({items, className, onChange, valueArr}) {
	const [searchText, setSearchText] = useState("");

	const handleSearch = ({target}) => setSearchText(target.value);

	const filterdSearchResults = () => {
		if (!searchText) {
			return items.map(item => (
				<label className={`d-block`}>
					<input
						type="checkbox"
						className="form-check-input me-2"
						value={item}
						onChange={onChange}
						checked={valueArr.includes(item)}
					/>
					{item}
				</label>
			));
		}

		return items.map(
			item =>
				item.includes(searchText) && (
					<label className={`d-block`}>
						<input
							type="checkbox"
							className="form-check-input me-2"
							value={item}
							onChange={onChange}
							checked={valueArr.includes(item)}
						/>
						{item}
					</label>
				)
		);
	};

	return (
		<div className={`multi-select-box ${className}`}>
			<input
				value={searchText}
				onChange={handleSearch}
				type="search"
				className="search d-inline form-control form-control-lg"
			/>
			<div className="float-box border border-2 rounded-3">
				{filterdSearchResults()}
			</div>
			<i className="multi-select-box-icon fa-solid fa-magnifying-glass fa-2x"/>
		</div>
	);
}
