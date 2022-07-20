const express = require("express");
const router = express.Router();
const con = require("../otherRes/DbConnection");

router.post("/", (_request, response) => {
    con.query(
        `SELECT p.*,
                PI.image_path,
                sh.shop_name,
                sh.location
            FROM Product p
            JOIN
                (SELECT *
                 FROM ProductImage
                 GROUP BY ProductImage.product_id) AS PI USING(product_id)
            JOIN Shop sh USING(shop_id) WHERE p.enabled_status=1 AND sh.enabled_status=1`
    )
        .then(([result]) =>
            result.length ? response.send(result) : response.send([])
        )
        .catch((error) => response.sendStatus(500));
    //we can call res.status(500).send() or res.status(500).end() or res.sendStatus(500)
});

router.post("/:productId", async ({ params }, response) => {
    try {
        const [result] = await con.query(
            "SELECT category FROM Product WHERE product_id=?",
            params.productId
        );

        if (!result.length) return response.sendStatus(400);

        let query;
        switch (result[0].category) {
            case "SmartPhone":
                query = `
                    SELECT
                        prd.*,
                        shop_name,
                        location,
                        email,
                        phone_number,
                        smrt.*,
                        sensors,
                        image_paths
                    FROM
                        Product prd
                    JOIN(
                        SELECT
                            product_id,
                            GROUP_CONCAT(image_path) AS image_paths
                        FROM
                            ProductImage
                        WHERE
                            product_id = ?
                    ) AS ProductImages USING(product_id)
                    JOIN SmartPhone AS smrt USING(product_id)
                    JOIN(
                        SELECT smart_phone_id,
                            GROUP_CONCAT(sensors) AS sensors
                        FROM
                            SmartPhoneSensors
                        GROUP BY smart_phone_id
                    ) AS smrtSensors USING(smart_phone_id)
                    JOIN Shop USING(shop_id)
                    WHERE
                        product_id = ?`;
                break;
            case "FeaturePhone":
                query = `
                    SELECT
                        prd.*,
                        shop_id,
                        shop_name,
                        location,
                        email,
                        phone_number,
                        ftre.*,
                        image_paths,
                        connectivity
                    FROM
                        Product prd
                    JOIN(
                        SELECT
                            product_id,
                            GROUP_CONCAT(image_path) AS image_paths
                        FROM
                            ProductImage
                        WHERE
                            product_id = ?
                    ) AS ProductImage USING(product_id)
                    JOIN Shop USING(shop_id)
                    JOIN FeaturePhone AS ftre USING(product_id)
                    JOIN(
                        SELECT
                            feature_phone_id,
                            GROUP_CONCAT(connectivity) AS connectivity
                        FROM
                            FeaturePhoneConnectivity
                    ) AS ftreCon USING(feature_phone_id)
                    WHERE
                        product_id = ?;`;
                break;
            case "Earphone":
                query = `
                    SELECT
                        shop_id,
                        prd.*,
                        erp.*,
                        shop_name,
                        location,
                        email,
                        phone_number,
                        image_paths
                    FROM
                        Product prd
                    JOIN Earphone erp USING(product_id)
                    JOIN(
                        SELECT
                            product_id,
                            GROUP_CONCAT(image_path) AS image_paths
                        FROM
                            ProductImage
                        WHERE
                            product_id = ?
                    ) AS ProductImage USING(product_id)
                    JOIN Shop USING(shop_id)
                    WHERE
                        product_id =?`;
                break;

            case "Charger":
                query = `
                    SELECT
                        shop_id,
                        prd.*,
                        chr.*,
                        shop_name,
                        location,
                        email,
                        image_paths
                    FROM
                        Product prd
                    JOIN Charger chr USING(product_id)
                    JOIN(
                        SELECT
                            product_id,
                            GROUP_CONCAT(image_path) AS image_paths
                        FROM
                            ProductImage
                        WHERE
                            product_id = ?
                    ) AS ProductImage USING(product_id)
                    JOIN Shop USING(shop_id)
                    WHERE
                        product_id = ?`;
                break;
            case "Other":
                query = 
                    `SELECT
                        shop_id,
                        prd.*,
                        shop_name,
                        location,
                        email,
                        image_paths
                    FROM
                        Product prd
                    JOIN(
                        SELECT
                            product_id,
                            GROUP_CONCAT(image_path) AS image_paths
                        FROM
                            ProductImage
                        WHERE
                            product_id = ?
                    ) AS ProductImage USING(product_id)
                    JOIN Shop USING(shop_id)
                    WHERE
                        product_id =?`;
            default:
                break;
        }
        const [[finResults]] = await con.query(query, [params.productId,params.productId]);

        if (!finResults) return response.sendStatus(400);

        switch (result[0].category) {
            case "SmartPhone":
                let { sensors } = finResults;
                finResults.sensors = sensors.split(",");
                break;

            case "FeaturePhone":
                let { connectivity } = finResults;
                finResults.connectivity = connectivity.split(",");
                break;

            default:
                break;
        }

        let { image_paths } = finResults;
        finResults.image_paths = image_paths.split(",");

        response.send(finResults);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

module.exports = router;
