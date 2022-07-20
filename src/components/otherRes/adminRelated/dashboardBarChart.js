import React, { useState, useEffect } from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import { axiosCus } from "../commonFun";

const DashboardBarChart = (props) => {
  const [data, setData] = useState([]);

  useEffect(
    () =>
      axiosCus
        .post("/count/allMonProCounts")
        .then(({ data }) => setData(data))
        .catch((error) => console.log(error)),
    []
  );

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="products" fill="#F8934D" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
