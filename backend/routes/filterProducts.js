const express = require("express");
const router = express.Router();
const con = require("../otherRes/DbConnection");

router.post("/", ({ body }, response) => {
    let { category, minPrice, maxPrice, ...catRelFilters } = body;

    let query =
        "SELECT p.*,pI.image_path,sh.shop_name,sh.location FROM Product p LEFT JOIN (SELECT * FROM ProductImage GROUP BY ProductImage.product_id) as pI USING(product_id) JOIN Shop sh USING(shop_id)";

    const addWhereorAnd = () =>
        (query += query.includes("WHERE") ? " AND " : " WHERE ");

    //catergory filter
    if (category.length > 0) {
        //to deal with one specific category and with extra filters
        if (category.length === 1 && !category.includes("Other")) {
            query += ` JOIN ${category[0]} USING (product_id)`;
            switch (category[0]) {
                case "SmartPhone":
                    //Recreated the object with key is similar to db coloumn name
                    catRelFilters = {
                        brand: catRelFilters.brand,
                        storage: catRelFilters.storage,
                        memory: catRelFilters.memory,
                        front_camera: catRelFilters.frontCamera,
                        rear_camera: catRelFilters.rearCamera,
                        battery_capacity: catRelFilters.battery,
                    };
                    break;
                case "FeaturePhone":
                    let { connectivity, brand } = catRelFilters;

                    if (connectivity.length > 0) {
                        query +=
                            "JOIN (SELECT feature_phone_id,GROUP_CONCAT(connectivity) as connectivity FROM FeaturePhoneConnectivity";
                        addWhereorAnd();
                        query += "connectivity IN (";
                        connectivity.map((con) => {
                            query += `'${con}',`;
                        });
                        query =
                            query.slice(0, -1) +
                            ") GROUP BY feature_phone_id) AS connectivity USING (feature_phone_id)";
                    }
                    catRelFilters = { brand };
                    break;
                case "Charger":
                    catRelFilters = {
                        type: catRelFilters.type,
                        fast_charger: catRelFilters.fastCharger,
                        no_of_usb_ports: catRelFilters.usbPorts,
                        connectivity: catRelFilters.connectivity,
                    };
                    break;
            }
            //dont need to check earphone because its keys are similar to coloumn name

            Object.entries(catRelFilters).forEach(([coloumName, valArr]) => {
                if (valArr.length > 0) {
                     addWhereorAnd();
                    query += ` ${coloumName} IN (`;
                    valArr.map((item) => {
                        query += `'${item}',`;
                    });
                    query = query.slice(0, -1) + ")";
                }
            });
        }

        // when morethan one category selected
        else {
            addWhereorAnd();
            query += "p.category IN (";
            category.map((cat) => {
                query += `'${cat}',`;
            });
            //to remove last comma in category query ex:-("SmartPhone",)
            //slice will take to parameter start and end and if negative values are given it come from back
            query = query.slice(0, -1) + ")";
        }
    }

    //checking whether minprice and maxprice exist
    if (minPrice && maxPrice) {
        if (minPrice > maxPrice) {
            //will send response and end the response
            response.status(400); //status code for bad request
            response.statusMessage(
                "Minimum price must be less than Maximum price"
            );
            response.send();
            return; //to stop funtion further executing
        }
        //this runs when minprice > maxprice fails like else
        addWhereorAnd();
        query += `p.price BETWEEN ${minPrice} and ${maxPrice}`;
    }
    //checking whether atleast min price exists
    else if (minPrice) {
        addWhereorAnd();
        query += `p.price >= ${minPrice}`;
    }
    //checking whether atleast max price exists
    else if (maxPrice) {
        addWhereorAnd();
        query += `p.price <= ${maxPrice}`;
    }

    addWhereorAnd();
    query += "p.enabled_status=1";

    console.log(query);

    //executing query
    con.query(query)
        .then(([result]) => response.status(200).send(result))
        .catch((error) => {
            console.log(error.message);
            return response.sendStatus(500);
        });
});

module.exports = router;
