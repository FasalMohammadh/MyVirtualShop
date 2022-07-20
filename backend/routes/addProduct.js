const express = require("express");
const multer = require("multer");
const con = require("../otherRes/DbConnection");
const router = express.Router();

const storage = multer.diskStorage({
	destination: "./prdImgs/",
	//when we use underscore it shows that the _ parameter is not used
	filename: (_request, file, cb) =>
		cb(null, Date.now() + Math.random() * 1000 + file.originalname),
	fileFilter: (_request, file, cb) => {
		let isAccepted =
			file.mimetype === "image/jpeg" ||
			file.mimetype === "image/png" ||
			file.mimetype === "image/jpeg";
		cb(null, isAccepted);
		if (!isAccepted)
			return cb(new Error("only (.png .jpeg .jpg) Images are accepted"));
	},
});

const images = multer({ storage: storage });

router.post(
	"/",
	images.array("images", 5),
	async ({ files, body, session }, response) => {
		//check whether user logged in
		!session.shopId && response.sendStatus(401);
		let { title, category, price, description } = body,
			errorMsgs = [];

		//Validation for common items
		title === ""
			? errorMsgs.push("Product title is required")
			: category === ""
			? errorMsgs.push("Did you forgot to select a category")
			: price === ""
			? errorMsgs.push("Please enter the price of the product")
			: description === "" &&
			  errorMsgs.push(
					"Enter More details in description this will boost your product view"
			  );

		//check whether atleast 1 image is present
		!files && errorMsgs.push("Images are missing");

		//if any errors found response will be send with error array
		if (errorMsgs.length) return response.send(errorMsgs);

		try {
			//validation over queries start
			let productId = await idGenarator("Product", "product_id", "prd");
			const queries = [];
			const queriesData = [];

			let query =
					"INSERT INTO Product (product_id, title, category, price, description, published_date, shop_id) VALUES (?,?,?,?,?, current_timestamp(),?);",
				queryData = [
					productId,
					title,
					category,
					price,
					description,
					session.shopId,
				];

			queries.push(query);
			queriesData.push(queryData);

			query =
				"INSERT INTO ProductImage (product_id, image_path, image_id) VALUES ";
			let imageId = 0;
			queryData = [];
			files.forEach((file) => {
				imageId++;
				query += "(?, ?, ?),";
				queryData.push(
					productId,
					file.path,
					productId + "-img-" + imageId
				);
			});
			query = query.slice(0, -1) + ";";

			queries.push(query);
			queriesData.push(queryData);

			switch (body.category) {
				case "SmartPhone":
					let smartPhoneId = await idGenarator(
						"SmartPhone",
						"smart_phone_id",
						"smrt"
					);

					query =
						"INSERT INTO SmartPhone (smart_phone_id, product_id, brand, model, year, memory, storage, front_camera, rear_camera, battery_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
					queryData = [
						smartPhoneId,
						productId,
						body.brand,
						body.model,
						body.year,
						body.memory,
						body.storage,
						body.frntCam,
						body.rearCam,
						body.battery,
					];
					queries.push(query);
					queriesData.push(queryData);

					let { sensors } = body;
					if (sensors) {
						query =
							"INSERT INTO SmartPhoneSensors (smart_phone_id, sensors) VALUES ";

						queryData = [];
						sensors = sensors.split(",");
						sensors.forEach((sensor) => {
							query += "(?,?),";
							queryData.push(smartPhoneId, sensor);
						});
						query = query.slice(0, -1) + ";";
					}
					queries.push(query);
					queriesData.push(queryData);
					break;

				case "FeaturePhone":
					let featurePhoneId = await idGenarator(
						"FeaturePhone",
						"feature_phone_id",
						"ftre"
					);
					query =
						"INSERT INTO FeaturePhone (feature_phone_id, product_id, brand, standby_days) VALUES (?, ?, ?, ?);";
					queryData = [
						featurePhoneId,
						productId,
						body.brand,
						body.standby + "Days",
					];

					queries.push(query);
					queriesData.push(queryData);

					let { connectivity } = body;
					if (connectivity) {
						query =
							"INSERT INTO FeaturePhoneConnectivity (feature_phone_id, connectivity) VALUES ";
						connectivity = connectivity.split(",");
						queryData = [];
						connectivity.forEach((con) => {
							query += "(?, ?),";
							queryData.push(featurePhoneId, con);
						});
						query = query.slice(0, -1) + ";";
					}
					queries.push(query);
					queriesData.push(queryData);
					break;

				case "Charger":
					query =
						"INSERT INTO Charger (product_id, type, fast_charger, no_of_usb_ports,connectivity) VALUES (?, ?, ?, ?, ?);";
					queryData = [
						productId,
						body.type,
						body.fastCharger,
						body.usbPorts,
						body.connectivity,
					];
					queries.push(query);
					queriesData.push(queryData);
					break;

				case "Earphone":
					query =
						"INSERT INTO Earphone (product_id, brand, type, connectivity) VALUES (?,?,?,?);";
					queryData = [
						productId,
						body.brand,
						body.type,
						body.connectivity,
					];
					queries.push(query);
					queriesData.push(queryData);
					break;

				default:
					break;
			}


			//Begininig the transection
			// await con.query("BEGIN;");

			//running all the queries
			for (let i = 0; i < queries.length; i++)
				await con.query(queries[i], queriesData[i]);

			response.sendStatus(200);
			//ending transection with changes
			// await con.query("COMMIT;");
		} catch (error) {
			console.log(error);
			if (error.sqlMessage) {
				//if an sql error occured transection is rollbacked
				//and changes during transection is discarded
				// await con.query("ROLLBACK;");
				// console.log("rollbacked;");
			}
			response.sendStatus(500);
		}
	}
);

const idGenarator = async (tableName, coloumnName, stringPart) => {
	let [[result]] = await con.query(
		`SELECT MAX(${coloumnName}) AS id FROM ${tableName}`
	);

	if (result.id) {
		let { id } = result;
		let [_str, integerPart] = id.split("-");
		integerPart = (parseInt(integerPart) + 1).toString();
		integerPart = "0".repeat(6 - integerPart.length) + integerPart;
		id = stringPart.concat("-", integerPart);
		return id;
	}
	return `${stringPart}-000001`;
};

module.exports = router;

// /*
// try
// 	{
// 		let productId = await idGenarator('Product', 'product_id', 'prd'),
// 			{ title, category, price } = body,
// 			errorMsgs = [];

// 		//Validation for common items
// 		if (title === "" || category === "" || price === "")
// 		{
// 			title === ""
// 				? errorMsgs.push("Product title is required")
// 				: category === ""
// 					? errorMsgs.push("Did you forgot to select a category")
// 					: errorMsgs.push("Please enter the price of the price of the product");
// 		}
// 		//if any validation errors found response will be send with error array
// 		if (errorMsgs.length > 0) return response.send(errorMsgs);

// 		await con

// 			.query(
// 				'INSERT INTO Product (product_id, title, category, price, description, published_date, shop_id) VALUES (?,?,?,?,?, current_timestamp(),?)',
// 				[productId, title, category, price, "", session.shopId]
// 			);
// 		let productImageQuery = 'INSERT INTO ProductImage (product_id, image_path, image_id) VALUES ',
// 			productImageQueryData = [],
// 			imageId = 0;
// 		files.forEach(file =>
// 		{
// 			imageId++;
// 			productImageQuery += '(?, ?, ?),';
// 			productImageQueryData.push(productId, file.path, productId + '-img-' + imageId);
// 		});
// 		productImageQuery = productImageQuery.slice(0, -1);

// 		await con.query(productImageQuery, productImageQueryData);

// 		switch (body.category)
// 		{
// 			case 'SmartPhone':
// 				let smartPhoneId = await idGenarator('SmartPhone', 'smart_phone_id', 'smrt');
// 				let { sensors, brand, model, year, memory, storage, frntCam, rearCam, battery } = body,
// 					query =
// 						'INSERT INTO SmartPhone (smart_phone_id, product_id, brand, model, year, memory, storage, front_camera, rear_camera, battery_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
// 					queryData = [smartPhoneId, productId, brand, model, year, memory, storage, frntCam, rearCam, battery];
// 				await con.query(query, queryData);

// 				query = 'INSERT INTO SmartPhoneSensors (smart_phone_id, sensors) VALUES ',
// 					queryData = [];

// 				sensors = sensors.split(",");
// 				sensors.forEach(sensor =>
// 				{
// 					query += '(?,?),';
// 					queryData.push(smartPhoneId, sensor);
// 				});
// 				query = query.slice(0, -1);
// 				await con.query(query, queryData);
// 				response.send("Successfully added");
// 				break;

// 			case 'FeaturePhone':
// 				let { brand: brandftre, connectivity, standby } = body,
// 					featurePhoneId = idGenarator(FeaturePhone, feature_phone_id, ftre);
// 				query = 'INSERT INTO FeaturePhone (feature_phone_id, product_id, brand, standby_days) VALUES (?, ?, ?, ?)';
// 				queryData = [featurePhoneId, productId, brand, standby];

// 				await con.query(query, queryData);

// 				query = 'INSERT INTO FeaturePhoneConnectivity (feature_phone_id, connectivity) VALUES ';

// 				connectivity = connectivity.split(',');
// 				queryData = [];
// 				for (let con of connectivity)
// 				{
// 					query += '(?, ?),';
// 					queryData.push(featurePhoneId, con);
// 				}
// 				query = query.slice(0, -1);

// 				await con.query(query, queryData);
// 				response.send("Successfully added");
// 				break;
// 			case 'Charger':
// 				let { fastCharger, usbPorts, connectivity: chgCon, type } = body;
// 				query = "INSERT INTO Charger (product_id, brand, type, fast_charger, no_of_usb_ports,connectivity) VALUES (?, ?, ?, ?, ?,?)";

// 				await con.query(query, [productId, brand, type, fastCharger, usbPorts, chgCon]);
// 				break;
// 			case 'Earphone':
// 				let { brand: brd, type: tpe, connectivity: cons } = body;
// 				query = "INSERT INTO Earphone (product_id, brand, type, connectivity) VALUES (?,?,?,?)";

// 				await con.query(query, [productId, brd, tpe, cons]);
// 				break;
// 			default: break;
// 		};
// 	} catch (error)
// 	{
// 		console.log(error);
// 	}
// });
// */

// // let productId = await con.query("SELECT MAX(?) AS prdId FROM Product", product_id);
// // productId = productId[0];
// // if (productId[0].length > 0)
// // {
// //     productId = productId[0].prdId;
// //     let [stringPart, integerPart] = productId.split('-');
// //     integerPart = (parseInt(integerPart) + 1).toString();
// //     integerPart = integerPart + "0".repeat(6 - integerPart.length);
// //     productId = stringPart.concat(['-', integerPart]);
// // }
// // else productId = "prd-000001";
