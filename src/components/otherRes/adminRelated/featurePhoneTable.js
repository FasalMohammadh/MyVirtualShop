import React, {useState, useEffect, Fragment} from "react";
import MaterialTable from "material-table";
import {axiosCus, tableIcons, tableOptions} from "../commonFun";
import Model from "../model";

const FeaturePhoneTable = props => {
	const [tableData, setTableData] = useState([]);
	const [delModel, setDelModel] = useState({
		hiddenState: true,
		productToDel: "",
	});

	useEffect(() => {
		axiosCus
			.post("/admin/featurePhones")
			.then(response => {
				setTableData(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const columns = [
		{title: "ID", field: "feature_phone_id"},
		{title: "Product ID", field: "product_id"},
		{title: "Brand", field: "brand"},
		{title: "Standby Days", field: "standby_days"},
	];

	const actions = [
		rowData => ({
			icon: tableIcons.Delete,
			tooltip: "Delete " + rowData.feature_phone_id,
			onClick: (_event, {product_id}) => {
				// tempDelModel = {hiddenState: false, productToDel: product_id};
				const tempDelModel = {...delModel};
				tempDelModel.hiddenState = false;
				tempDelModel.productToDel = product_id;
				setDelModel(tempDelModel);
			},
		}),
	];

	return (
		<Fragment>
			<MaterialTable
				title="Featurephones"
				options={tableOptions}
				icons={tableIcons}
				columns={columns}
				data={tableData}
				actions={actions}
			/>
			<Model
				hide={delModel.hiddenState}
				title="Delete Featurephone"
				message={`Are you sure want to delete ${delModel.productToDel}?`}
				onclickConfirm={() =>
					axiosCus.post(
						`/admin/products/del/${delModel.productToDel}`
					)
				}
				onclickCancel={() => {
					let tempDelModel = {...delModel};
					tempDelModel.hiddenState = true;
					setDelModel(tempDelModel);
				}}
			/>
		</Fragment>
	);
};

export default FeaturePhoneTable;
