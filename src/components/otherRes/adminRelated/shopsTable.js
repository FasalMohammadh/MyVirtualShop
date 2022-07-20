import React, { useState, useEffect, Fragment } from "react";
import MaterialTable from "material-table";
import { axiosCus, tableIcons, tableOptions } from "../commonFun";
import Model from "../model";
import ToastList from "../ToastList";

const Adminshops = () => {
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shopToDel, setShopToDel] = useState(null);
  const [toastMessages, setToastMessages] = useState([]);

  const setTableDataFun = () =>
    axiosCus
      .post("/admin/shops")
      .then(({ data }) => {
        setTableData(data);
      })
      .catch((error) => {
        console.log(error);
      });

  useEffect(setTableDataFun, []);

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) setIsLoading(false);
    }, 1000);
  }, [tableData]);

  const handleDelModelConfirm = () => {
    axiosCus
      .post(`/admin/shops/del/${shopToDel.shop_id}`)
      .then(({ status }) => {
        if (status === 200) {
          setShopToDel(null);
          setTableDataFun();
          setToastMessages([
            {
              type: "success",
              title: "Successfully Deleted",
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
        setShopToDel(null);
        setToastMessages([
          {
            type: "error",
            title: "Internal Error",
            message: "Failed to delete",
          },
        ]);
      });
  };

  const columnData = [
    {
      align: "center",
      title: "Id",
      field: "shop_id",
      editable: "never",
    },
    {
      align: "center",
      field: "shop_name",
      title: "Name",
      editable: "never",
    },
    {
      align: "center",
      title: "Location",
      field: "location",
      editable: "never",
    },
    {
      align: "center",
      title: "Email",
      field: "email",
      editable: "never",
    },
    {
      align: "center",
      title: "Phone Number",
      field: "phone_number",
      editable: "never",
    },
    {
      align: "center",
      title: "Enable/Disable Shop",
      field: "enabled_status",
      editable: "onUpdate",
      lookup: { 1: "Enabled", 0: "Disabled" },
    },
  ];

  const actions = [
    (rowData) => ({
      icon: tableIcons.Delete,
      tooltip: `Delete ${rowData.shop_name}`,
      onClick: (_event, rowData) => setShopToDel(rowData),
    }),
  ];

  const editable = {
    onRowUpdate: (newData) => {
      return new Promise((resolve, reject) =>
        axiosCus
          .post(`/admin/shop/update/${newData.shop_id}`, {
            enabled_status: newData.enabled_status,
          })
          .then((response) => {
            if (response.status === 200) {
              setTableDataFun();
              resolve();
            }
          })
          .catch(reject())
      );
    },
  };

  return (
    <Fragment>
      <MaterialTable
        icons={tableIcons}
        options={tableOptions}
        actions={actions}
        title="Shops"
        data={tableData}
        columns={columnData}
        isLoading={isLoading}
        editable={editable}
      />
      {shopToDel && (
        <Model
          title="Delete Confirmation"
          message={`Are you sure want to delete ${shopToDel.shop_name}`}
          onclickCancel={() => setShopToDel(null)}
          onclickConfirm={handleDelModelConfirm}
        />
      )}
      {toastMessages.length > 0 && <ToastList toasts={toastMessages} />}
    </Fragment>
  );
};

export default Adminshops;
