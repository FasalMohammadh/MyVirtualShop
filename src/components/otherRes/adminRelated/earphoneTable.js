import React, {useState, useEffect, Fragment} from "react";
import MaterialTable from "material-table";
import {axiosCus, tableIcons, tableOptions} from "../commonFun";
import Model from "../model";

const EarphoneTable = props => {
	const [tableData, setTableData] = useState([]);
	const [delModel, setDelModel] = useState({
		hiddenState: true,
		productToDel: "",
	});

	useEffect(() => {
		axiosCus
			.post("/admin/earphones")
			.then(response => {
				setTableData(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const columns = [
		{title: "Product ID", field: "product_id"},
		{title: "Brand", field: "brand"},
		{title: "Type", field: "type"},
		{title: "Connectivity", field: "connectivity"},
	];

	const actions = [
		rowData => ({
			icon: tableIcons.Delete,
			tooltip: "Delete " + rowData.product_id,
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
				title="Earphones"
				options={tableOptions}
				icons={tableIcons}
				columns={columns}
				data={tableData}
				actions={actions}
			/>
			<Model
				hide={delModel.hiddenState}
				title="Delete Earphone"
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

export default EarphoneTable;
