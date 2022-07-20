import React, { useState, useEffect } from "react";
import TextBox from "../TextBox";
import { axiosCus } from "../commonFun";

const ProductEditInfoForm = ({
	productId,
	closeFun,
	setParentToasts,
	triggerParentRefresh,
}) => {
	const [data, setData] = useState({});

	useEffect(
		() =>
			axiosCus
				.post(`/shopProducts/${productId}`)
				.then(({ status, data }) => {
					status === 200 && setData(data);
					status === 204 && alert("unable find product sorry!");
				})
				.catch((error) => console.log(error)),
		[]
	);

	const onchangeFun = ({ target }) => {
		const { name, value } = target;
		const tempData = { ...data };
		tempData[name] = value;
		setData(tempData);
	};

	const txtbxes = [
		{
			value: data.title,
			name: "title",
			title: "Product Title",
			icon: "fa-solid fa-tag",
		},
		{
			value: data.price,
			name: "price",
			title: "Product price",
			icon: "fa-solid fa-dollar",
		},
	];

	const styleObj = {
		zIndex: 3,
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		overflow: "auto",
		maxHeight: "80%",
	};

	const handleUpdateProduct = () => {
		axiosCus
			.post(`/shopProducts/update/${productId}`, data)
			.then(({ status, data }) => {
				status === 200 &&
					setParentToasts([
						{
							type: "success",
							title: "Successfully updated",
							message: data,
						},
					]);
				closeFun();
				triggerParentRefresh();
			})
			.catch((error) => {
				if (error.response) {
					const { status, data } = error.response;
					return status === 400
						? setParentToasts([
								{
									type: "error",
									title: "Update Failed",
									message: data,
								},
						  ])
						: status === 500 &&
								setParentToasts([
									{
										type: "error",
										title: "Update Failed",
										message: "Internal Server Error",
									},
								]);
				}
				setParentToasts([
					{
						type: "error",
						title: "Something went wrong",
						message: "please try again later",
					},
				]);
				closeFun();
			});
	};

	return (
		<div style={styleObj} className="box bg-white d-flex flex-column gap-4">
			<button
				onClick={closeFun}
				className="btn btn-close ms-auto btn-lg p-3"
				style={{ width: "fit-content" }}
			/>
			{txtbxes.map((txtbx) => (
				<TextBox
					{...txtbx}
					onchangeFun={onchangeFun}
					type="text"
					key={txtbx.name}
					className="w-100"
				/>
			))}
			<div>
				<h4 className="mb-0">Description</h4>
				<textarea
					name="description"
					value={data.description}
					onChange={onchangeFun}
					style={{ resize: "none" }}
					spellCheck="false"
					placeholder="Tell us more about your product"
					className="p-2 form-control-plaintext form-control-lg border border-2 border-dark"
					cols="30"
					rows="10"
				/>
			</div>
			<button
				className="ms-auto btn btn-primary btn-lg"
				onClick={handleUpdateProduct}
			>
				Apply Changes
			</button>
		</div>
	);
};

export default ProductEditInfoForm;
