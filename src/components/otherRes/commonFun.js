import axios from "axios";
import React, { forwardRef } from "react";

function handleChangeObjCloner(event, tempValues) {
  if (typeof tempValues === "object") {
    let { name, value } = event.target;
    tempValues[name] = value;
    return tempValues;
  }
}

const axiosCus = axios.create({
  baseURL: "http://localhost:3010",
  withCredentials: true,
});

const tableIcons = {
  Check: forwardRef((props, ref) => (
    <i className="fa-solid fa-check" {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <i className="fa-solid fa-xmark" {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <i className="fa-solid fa-pencil" {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <i className="fa-solid fa-file-arrow-down" {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref) => (
    <i className="fa-solid fa-trash-can" {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-xmark" />
  )),
  Search: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-search" />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-angle-left" />
  )),
  FirstPage: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-angles-left" />
  )),
  NextPage: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-angle-right" />
  )),
  LastPage: forwardRef((props, ref) => (
    <i ref={ref} {...props} class="fa-solid fa-angles-right" />
  )),
  SortArrow: forwardRef((props, ref) => (
    <i ref={ref} {...props} className="ms-1 fa-solid fa-sort-up" />
  )),
  ViewColumn: forwardRef((props, ref) => (
    <i ref={ref} {...props} className="fa-solid fa-table-columns" />
  )),
  Filter: forwardRef((props, ref) => (
    <i {...props} ref={ref} className="fa-solid fa-filter" />
  )),
};

const tableOptions = {
  filtering: true,
  exportButton: true,
  emptyRowsWhenPaging: true,
  columnsButton: true,
  actionsColumnIndex: -1,
  headerStyle: {
    zIndex: 0,
    backgroundColor: "#6E7BD9",
    color: `white`,
  },
  rowStyle: (_rowData, index) => ({
    backgroundColor: `${index % 2 === 0 ? "#ECF7E7" : "#fff"}`,
  }),
};

const emailValidation = (email) => {
  if (typeof(email) === "string") {
    return email !== ""
      ? email.includes("@") &&
        email.indexOf("@") !== 0 &&
        email.includes(".com")
        ? ""
        : "Email is not valid"
      : "Email is required";
  }
};

// && email.indexOf('@') < email.length - 9

export {
  handleChangeObjCloner,
  axiosCus,
  emailValidation,
  tableIcons,
  tableOptions,
};
