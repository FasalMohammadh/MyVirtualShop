const express = require("express");
const con = require("../otherRes/DbConnection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();

router.post("/", async ({ session, body }, response) => {
    try {
        //getting the shopId from session if logged shopId returned else its undefined
        let { shopId } = session;

        if (!shopId) return response.status(400).send("You're not logged in");

        let { currentPass, newPass } = body,
            [actualResult] = await con.query(
                "SELECT password FROM Shop WHERE shop_id=?",
                shopId
            );

        if (actualResult.length === 0) return response.sendStatus(400);

        let { password: oldPassHashed } = actualResult[0];

        if (await bcrypt.compare(currentPass, oldPassHashed)) {
            let newHashedPass = await bcrypt.hash(newPass, saltRounds);
            await con.query("UPDATE Shop SET password=? WHERE shop_id=?", [
                newHashedPass,
                shopId,
            ]);
            return response.status(200).send("Password changed successfully");
        }

        response.status(403).send("Password change failed");
        //403 response status code indicates that the server understands the request but refuses to authorize it
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

module.exports = router;
