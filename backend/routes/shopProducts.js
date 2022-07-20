const express = require("express");
const con = require("../otherRes/DbConnection");
const router = express.Router();

router.post("/", async (request, response) => {
    try {
        console.log(request.session.shopId);
        let [result] = await con.query(
            `SELECT p.*,
                pI.image_path,
                sh.shop_name,
                sh.location,
                sh.enabled_status
            FROM Product p
            LEFT JOIN
                (SELECT *
                FROM ProductImage
                GROUP BY ProductImage.product_id) AS pI USING(product_id)
            JOIN Shop sh USING(shop_id)
            WHERE shop_id=? AND sh.enabled_status=1 AND p.enabled_status=1`,
            [request.session.shopId]
        );
        return result.length > 0
            ? response.send(result)
            : response.send("no records");
    } catch (error) {
        console.log(error);
    }
});

router.post("/:productId", ({ params, session }, response) =>
    con
        .query(
            `SELECT p.title,p.price,p.description
            FROM Product p
            JOIN Shop sh USING(shop_id)
            WHERE shop_id=? AND sh.enabled_status=1 AND p.enabled_status=1 AND product_id=?`,
            [session.shopId, params.productId]
        )
        .then(([result]) =>
            result.length > 0
                ? response.send(result[0])
                : response.sendStatus(204)
        )
        .catch((error) => console.error(error))
);

router.post("/del/:productId", ({ params, session }, response) =>
    con
        .query("DELETE FROM Product WHERE shop_id=? AND product_id=?", [
            session.shopId,
            params.productId,
        ])
        .then(([result]) =>
            result.affectedRows === 1
                ? response
                      .status(200)
                      .send("The Product has been deleted successfully")
                : response.status(400).send("Failed to delete the product")
        )
        .catch((error) => console.error(error))
);

router.post("/update/:productId", ({ body, params, session }, response) => {
    const { description, price, title } = body;
    con.query(
        "UPDATE Product SET title=?,price=?,description=? WHERE shop_id=? AND product_id=?",
        [title, price, description, session.shopId, params.productId]
    )
        .then(([result]) =>//returns a array with an object
            result.affectedRows === 1
                ? response
                      .status(200)
                      .send("The Product has been updated successfully")
                : response.status(400).send("Failed to update the product")
        )
        .catch((error) => console.error(error));
});

router.post("/getProducts/:shopId", async (request, response) => {
    try {
        let result = await con.query(
            `SELECT p.*,
                pI.image_path,
                sh.shop_name,
                sh.location
            FROM Product p
            LEFT JOIN
                (SELECT *
                FROM ProductImage
                GROUP BY ProductImage.product_id) AS pI USING(product_id)
            JOIN Shop sh USING(shop_id)
            WHERE shop_id=? `,
            [request.params.shopId]
        );
        return result.length > 0
            ? response.send(result[0])
            : response.send("no records");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
