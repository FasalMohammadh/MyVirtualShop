import React, { useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { axiosCus, tableIcons, tableOptions } from "../commonFun";
import Model from "../model";
import Toast from "../toast";

const SmartPhoneTable = (props) => {
	const [tableData, setTableData] = useState([]);
	const [delModel, setDelModel] = useState({
		hiddenState: true,
		productToDel: "",
	});
	const [toastArr, setToastArr] = useState([]);

	const getAndSetTableData = () =>
		axiosCus
			.post("/admin/smartPhones")
			.then((response) => setTableData(response.data))
			.catch((error) => console.log(error));

	useEffect(getAndSetTableData, []);

	const columns = [
		{ title: "ID", field: "smart_phone_id" },
		{ title: "Product ID", field: "product_id" },
		{ title: "Brand", field: "brand" },
		{ title: "Model", field: "model" },
		{ title: "Year", field: "year" },
		{ title: "Memory", field: "memory" },
		{ title: "Storage", field: "storage" },
		{ title: "Front Camera", field: "front_camera" },
		{ title: "Rear Camera", field: "rear_camera" },
		{ title: "Battery Capacity", field: "battery_capacity" },
		{ title: "Sensors", field: "sensors" },
	];

	const actions = [
		(rowData) => ({
			icon: tableIcons.Delete,
			tooltip: "Delete " + rowData.smart_phone_id,
			onClick: (_event, { product_id }) => {
				const tempDelModel = { ...delModel };
				tempDelModel.hiddenState = false;
				tempDelModel.productToDel = product_id;
				setDelModel(tempDelModel);
			},
		}),
	];

	//all about delete model
	const modelConfirmDelete = () => {
		axiosCus
			.post(`/admin/products/del/${delModel.productToDel}`)
			.then((response) => {
				const tempDelModel = { ...delModel };
				tempDelModel.hiddenState = true;
				setDelModel(tempDelModel);
				getAndSetTableData();
				setToastArr(() => {
					const tempToastArr = [...toastArr];
					tempToastArr.push({
						type: "success",
						title: "Success",
						message: "Product Deleted Successfully",
					});
					return tempToastArr;
				});
			})
			.catch((error) => {
				const tempDelModel = { ...delModel };
				tempDelModel.hiddenState = false;
				setDelModel(tempDelModel);
				setToastArr(() => {
					const tempToastArr = [...toastArr];
					tempToastArr.push({
						type: "error",
						title: "Error",
						message: "Something Went Wrong",
					});
					return tempToastArr;
				});
			});
	};

	const modelCancelDelete = () => {
		const tempDelModel = { ...delModel };
		tempDelModel.hiddenState = true;
		setDelModel(tempDelModel);
	};

	//all about toast messages
	const deleteToast = () =>
		setToastArr(() => {
			const tempToastArr = [...toastArr];
			tempToastArr.shift();
			return tempToastArr;
		});

	const loadToast = () => {
		if (toastArr.length) {
			setTimeout(deleteToast, 2000);
			return <Toast {...toastArr[0]} onclickFun={deleteToast} />;
		}
	};

	return (
		<Fragment>
			<MaterialTable
				title="Smartphones"
				options={tableOptions}
				icons={tableIcons}
				columns={columns}
				data={tableData}
				actions={actions}
			/>
			{!delModel.hiddenState && (
				<Model
					hide={false}
					title="Delete Smartphone"
					message={`Are you sure want to delete ${delModel.productToDel}?`}
					onclickConfirm={modelConfirmDelete}
					onclickCancel={modelCancelDelete}
				/>
			)}
			{loadToast()}
		</Fragment>
	);
};

export default SmartPhoneTable;
