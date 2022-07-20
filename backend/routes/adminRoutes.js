const express = require("express");
const con = require("../otherRes/DbConnection");
const fs = require("fs");

const router = express.Router();

// router.post("/",(request,reponse,next)=>{
//     request.session.adminId
// })
router.post("/shops", (request, response) => {
    con.query(
        "SELECT shop_id,shop_name,location,email,phone_number,enabled_status FROM Shop"
    )
        .then(([results]) => {
            return response.send(results);
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/shops/del/:shopId", ({params}, response) => {
    con.query("DELETE FROM Shop WHERE shop_id=?", params.shopId)
        .then(([affectedRows]) => {
            if (affectedRows) return response.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/shop/update/:shopId", (request, response) => {
    con.query("UPDATE Shop SET enabled_status=? WHERE shop_id=?", [
        parseInt(request.body.enabled_status),
        request.params.shopId,
    ])
        .then(([result]) => {
            if (result.affectedRows) return response.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/products", (request, response) => {
    con.query("SELECT * FROM Product")
        .then((result) => {
            return response.send(result[0]);
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/products/update/:productId", ({ body, params }, response) => {
    con.query("UPDATE Product SET enabled_status=? WHERE product_id=?", [
        parseInt(body.enabled_status),
        params.productId,
    ])
        .then(([result]) => {
            if (result.affectedRows) return response.sendStatus(200);
        })
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/products/del/:productId", async ({ params }, response) => {
    try {
        const [imagePaths] = await con.query(
            "SELECT * FROM ProductImage WHERE product_id=?",
            params.productId
        );

        imagePaths.forEach(({image_path}) => {
            image_path = "./" + image_path;
            fs.unlink(image_path,(error)=>{
                console.log(error);
            });
        });

        const [result] = await con.query(
            "DELETE FROM Product WHERE product_id=?",
            params.productId
        );
        result.affectedRows
            ? response.sendStatus(200)
            : response.sendStatus(400);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

router.post("/smartPhones", (request, response) => {
    con.query(
        "SELECT * FROM SmartPhone LEFT JOIN(SELECT smart_phone_id,GROUP_CONCAT(sensors) AS sensors FROM SmartPhoneSensors GROUP BY smart_phone_id)AS sensors USING(smart_phone_id);"
    )
        .then(([result]) => response.send(result))
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/featurePhones", (request, response) => {
    con.query(
        "SELECT * FROM FeaturePhone LEFT JOIN(SELECT feature_phone_id,GROUP_CONCAT(connectivity) AS connectivity FROM FeaturePhoneConnectivity GROUP BY feature_phone_id)AS connectivity USING(feature_phone_id);"
    )
        .then(([result]) => response.send(result))
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/earphones", (request, response) => {
    con.query("SELECT * FROM Earphone")
        .then(([result]) => response.send(result))
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

router.post("/chargers", (request, response) => {
    con.query("SELECT * FROM Charger")
        .then(([result]) => response.send(result))
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});

module.exports = router;
