const express = require("express");
const router = express.Router();
const con = require("../otherRes/DbConnection");

router.post("/shops", (request, response) => {
	con.query("SELECT COUNT(*) AS shopCount FROM Shop")
		.then((result) => response.send(result[0][0].shopCount.toString()))
		.catch((error) => console.log(error));
});

router.post("/products", (request, response) => {
	con.query("SELECT COUNT(*) AS productCount FROM Product")
		.then((result) => response.send(result[0][0].productCount.toString()))
		.catch((error) => console.log(error));
});

router.post("/today/shops", (request, response) => {
	con.query(
		"SELECT COUNT(*) AS shopCountToday FROM Shop WHERE DATE(Shop.joined_date)=CURRENT_DATE()"
	)
		.then((result) => response.send(result[0][0].shopCountToday.toString()))
		.catch((error) => console.log(error));
});

router.post("/today/products", (request, response) => {
	con.query(
		"SELECT COUNT(*) AS productCountToday FROM Product WHERE DATE(Product.published_date)=CURRENT_DATE();"
	)
		.then((result) =>
			response.send(result[0][0].productCountToday.toString())
		)
		.catch((error) => console.log(error));
});

router.post("/allCatCounts", (request, response) => {
	con.query(
		"SELECT category AS name,COUNT(*) AS catCount FROM Product GROUP BY Product.category;"
	)
		.then((result) => response.send(result[0]))
		.catch((error) => console.log(error));
});

router.post("/allMonProCounts", async (request, response) => {
	try {
		let [result] = await con.query(
			"SELECT MONTH(published_date) AS month,COUNT(*) AS products FROM Product GROUP BY MONTH(published_date);"
		);

		// console.log(result);

		result.forEach((obj) => {
			switch (obj.month) {
				case 1:
					obj.month = "January";
					break;
				case 2:
					obj.month = "February";
					break;
				case 3:
					obj.month = "March";
					break;
				case 4:
					obj.month = "April";
					break;
				case 5:
					obj.month = "May";
					break;
				case 6:
					obj.month = "June";
					break;
				case 7:
					obj.month = "July";
					break;
				case 8:
					obj.month = "August";
					break;
				case 9:
					obj.month = "September";
					break;
				case 10:
					obj.month = "October";
					break;
				case 11:
					obj.month = "November";
					break;
				case 12:
					obj.month = "December";
					break;
				default:
					break;
			}
		});
			response.send(result);

	} catch (error) {
		console.log(error);
		response.sendStatus(500);
	}
});

module.exports = router;
