import React, {useEffect, useState} from "react";
import {axiosCus} from "../commonFun";
import {SmallHeader} from "../shopSettingRelated/EditInfo";
import BarChart from "./dashboardBarChart.js";
import PieChart from "./dashBoardPieChart";
import "../../css/adminDashboard.css";

const Admindashboard = () => {
	const cards = [
		{
			bg: "linear-gradient(135deg,#20BDB5,#40E694)",
			icon: "fa-store",
			title: "Total Shops",
			url: "/shops",
		},
		{
			bg: "linear-gradient(135deg,#9A56FE,#E367D9)",
			icon: "fa-cart-shopping",
			title: "Total Products",
			url: "/products",
		},
		{
			bg: "linear-gradient(135deg,#F48764,#FB9D3A)",
			icon: "fa-store",
			title: "New Shops",
			url: "/today/shops",
		},
		{
			bg: "linear-gradient(135deg,#2A9EF6,#7FBEEB)",
			icon: "fa-cart-shopping",
			title: "New Products",
			url: "/today/products",
		},
	];

	let adminMessage = () => {
		let curHour = new Date().getHours();
		return curHour > 0 && curHour < 6
			? "Its Midnight"
			: curHour >= 6 && curHour < 12
			? "Good Morning"
			: curHour >= 12 && curHour < 16
			? "Good Afternoon"
			: curHour >= 16 && curHour < 18
			? "Good Evening"
			: "Its not work time";
	};

	return (
		<React.Fragment>
			<SmallHeader
				icon="fa-solid fa-user"
				title="WELCOME BACK ADMINISTRATOR!"
				info={adminMessage()}
			/>
			<div className="d-md-flex">
				{cards.map(card => (
					<Card {...card} />
				))}
			</div>
			<div className="adminDash-charts d-md-flex mt-2">
				<div className="w-50 mx-auto">
				<PieChart />
			</div>
			<div className="w-50 mx-auto">
				<BarChart/>
			</div>
			</div>
		</React.Fragment>
	);
};

const Card = props => {
	const [count, setCount] = useState(0);

	useEffect(
		() =>
			axiosCus
				.post(`/count${props.url}`)
				.then(response => {
					setCount(response.data);
				})
				.catch(error => {
					console.log(error);
				}),
		[]
	);

	return (
		<div
			className="adminDash-card rounded-3 flex-fill m-2"
			style={{background: `${props.bg}`}}
		>
			<p className="text-white adminDash-card-title">{props.title}</p>
			<div className="d-flex align-items-center justify-content-between">
				<i className={`fa-solid ${props.icon} adminDash-card-icon`} />
				<div className="adminDash-card-count">{count}</div>
			</div>
		</div>
	);
};

export default Admindashboard;
