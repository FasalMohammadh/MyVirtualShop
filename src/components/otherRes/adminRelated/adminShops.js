import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { axiosCus, tableIcons } from "../commonFun";
import Model from "../model";

const Adminshops = () => {
    const [tableData, setTableData] = useState([]);
    const [shopToDel, setShopToDel] = useState(null);
    const [toastMessages, setToastMessages] = useState([]);

    useEffect(() => {
        axiosCus
            .post("/admin/shops")
            .then((response) => {
                setTableData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const columnData = [
        {
            title: "Id",
            field: "shop_id",
        },
        {
            field: "shop_name",
            title: "Name",
        },
        {
            title: "Location",
            field: "location",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Phone Number",
            field: "phone_number",
        },
    ];

    const options = {
        tableLayout: "fixed",
        exportButton: true,
        emptyRowsWhenPaging: true,
        columnsButton: true,
        actionsColumnIndex: -1,
        headerStyle: {
            zIndex: 0,
            backgroundColor: "#4082E4",
        },
        rowStyle: (_rowData, index) => ({
            backgroundColor: `${
                index == 0 ? "#82CEFA" : index % 2 == 0 ? "#82CEFA" : "#75AAF0"
            }`,
        }),
    };

    const handleDelModelConfirm = () => {
        axiosCus
            .post(`/admin/shops/del/${delModel.shopToDel.shop_id}`)
            .then((response) => {
                // if (response.status === 200)
            })
            .catch((error) => {
                console.log(error);
                if (error.response) {
                    const { status } = error.response;
                    // if(status===500)
                }
            });
    };

    return (
        <React.StrictMode>
        <div>
            <MaterialTable
                icons={tableIcons}
                options={options}
                actions={[
                    (rowData) => ({
                        icon: "disable",
                        tooltip: "Enable/Disable Shop",
                    }),
                    (rowData) => ({
                        icon: tableIcons.Delete,
                        tooltip: `delete ${rowData.shop_name}`,
                        onClick: (_event, rowData) =>
                            setShopToDel(rowData.shop_id),
                    }),
                ]}
                title="Shops"
                data={tableData}
                columns={columnData}
            />
            {shopToDel && (
                <Model
                    title="Delete Confirmation"
                    message={`Are you sure want to delete ${delModel.shopToDel.shop_name}`}
                    hide={false}
                    onclickCancel={() => setShopToDel(null)}
                    onclickConfirm={handleDelModelConfirm}
                />
            )}
        </div>
        </React.StrictMode>
    );
};

export default Adminshops;
