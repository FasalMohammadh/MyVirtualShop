import React, { useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { axiosCus, tableIcons, tableOptions } from "../commonFun";
import Model from "../model";

const Admintable = () => {
    const [tableData, setTableData] = useState([]);
    const [delModel, setDelModel] = useState({
        hiddenState: true,
        productToDel: "",
    });

    const loadPrds = () =>
        axiosCus
            .post("/admin/products")
            .then((response) => setTableData(response.data))
            .catch((error) => console.log(error));

    useEffect(loadPrds, []);

    const columns = [
        {
            align: "center",
            title: "ID",
            field: "product_id",
            editable: "never",
        },
        {
            align: "center",
            title: "Title",
            field: "title",
            editable: "never",
        },
        {
            align: "center",
            title: "Category",
            field: "category",
            editable: "never",
        },
        {
            align: "center",
            title: "Price",
            field: "price",
            editable: "never",
        },
        {
            align: "center",
            title: "Description",
            field: "description",
            editable: "never",
        },
        {
            align: "center",
            title: "Date Added",
            field: "published_date",
            editable: "never",
        },
        {
            align: "center",
            title: "Shop Id",
            field: "shop_id",
            editable: "never",
        },
        {
            align: "center",
            title: "Enable/Disable Product",
            field: "enabled_status",
            lookup: { 1: "Enabled", 0: "Disabled" },
            editable: "onUpdate",
        },
    ];

    const actions = [
        (rowData) => ({
            icon: tableIcons.Delete,
            tooltip: "Delete " + rowData.product_id,
            onClick: (_event, { product_id }) => {
                // tempDelModel = {hiddenState: false, productToDel: product_id};
                const tempDelModel = { ...delModel };
                tempDelModel.hiddenState = false;
                tempDelModel.productToDel = product_id;
                setDelModel(tempDelModel);
            },
        }),
    ];

    const editable = {
        onRowUpdate: (newData) =>
            new Promise((resolve, reject) =>
                axiosCus
                    .post(`/admin/products/update/${newData.product_id}`, {
                        enabled_status: newData.enabled_status,
                    })
                    .then((response) => {
                        loadPrds();
                        resolve();
                    })
                    .catch((error) => reject())
            ),
    };

    return (
        <Fragment>
            <MaterialTable
                title="Products"
                icons={tableIcons}
                columns={columns}
                data={tableData}
                actions={actions}
                options={tableOptions}
                editable={editable}
            />
            <Model
                hide={delModel.hiddenState}
                title="Delete Smartphone"
                message={`Are you sure want to delete ${delModel.productToDel}?`}
                onclickConfirm={() =>
                    axiosCus.post(
                        `/admin/products/del/${delModel.productToDel}`
                    )
                }
                onclickCancel={() => {
                    let tempDelModel = { ...delModel };
                    tempDelModel.hiddenState = true;
                    setDelModel(tempDelModel);
                }}
            />
        </Fragment>
    );
};

export default Admintable;
