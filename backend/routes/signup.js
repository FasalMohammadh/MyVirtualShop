const express = require("express");
const router = express.Router(); //creating a router to manage signup routes
const con = require("../otherRes/DbConnection"); //importing connection variable
const bcrypt = require("bcrypt"); //to password hasing
const saltRounds = 10; //how many time hashing rounds to be done
const mailer = require("nodemailer"); //to send email
const accountSID = "ACde6e85920246fb73f1e08d5cf700324b";
const authToken = "8ed739bb6c9364578fd3ac418a50cbe2";
const twilio = require("twilio")(accountSID, authToken);

router.post(
    "/",
    async ({ shopName, email, pass, phoneNo, location }, response) => {
        try {
            let result = await con.query(
                "SELECT MAX(shop_id) AS maxId FROM Shop"
            );
            let shopId;
            if (result[0].length > 0) {
                shopId = result[0][0].maxId;
                let shopIdInt = shopId.split("-")[1];
                shopIdInt = (parseInt(shopIdInt) + 1).toString();
                shopIdInt = "0".repeat(6 - shopIdInt.length).concat(shopIdInt);
                shopId = "shop-".concat(shopIdInt);
            } else shopId = "shop-000001";

            pass = await bcrypt.hash(pass, saltRounds);

            //wait until execution if excution successfull stataus 2010 send else it goes to catch block
            await con.query(
                "INSERT INTO Shop VALUES(?,?,?,?,?,?,current_timestamp(),?)",
                [shopId, shopName, location, email, pass, phoneNo, 1]
            );
            response.sendStatus(200);
        } catch (error) {
            console.log(error.message);
            return response.sendStatus(500);
        }
    }
);

router.post("/email/:email", ({ params }, response) => {
    const { email } = params;

    con.query("SELECT * FROM SecretCodeEmail WHERE email=?", email)
        .then(([result]) => {
            if (result.length > 0) return response.sendStatus(400);
        })
        .catch((error) => console.log(error.message));

    const vrfCode = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);

    const mailTransporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "myvirtualshopofficial@gmail.com",
            pass: "Shop1234",
        },
    });

    mailConfig = {
        from: "myvirtualshopofficial@gmail.com",
        to: email,
        subject: "My Virtual Shop Email Verification",
        html: `Hello!<br>
            Your verification code is <strong>
            ${vrfCode}  
            </strong>.
            <br>Enter this code in our website to activate your virtual shop account.
            <br>If you have any questions, send us an email <a href="mailto:MyVirtualShopOfficial@gmail.com">MyVirtualShopOfficial@gmail.com</a>
            <br>We're glad you're here!
            <br>The Virtual Shop team`,
    };

    mailTransporter.sendMail(mailConfig, (error, _result) => {
        if (error) {
            console.log(error);
            return response.send("something went wrong");
        }

        con.query("INSERT INTO SecretCodeEmail VALUES (?,?)", [email, vrfCode])
            .then((result) => console.log(result))
            .catch((error) => console.log(error));

        response.send("ok");

        setTimeout(() => {
            con.query("DELETE FROM SecretCodeEmail WHERE email=?", email)
                .then((result) => console.log(result))
                .catch((error) => console.log(error));
        }, 1000 * 60 * 2); //1 min in milliSec
    });
});

router.post("/phoneNo/:phoneNo", async ({ params }, response) => {
    let { phoneNo } = params;
    phoneNo = "+94" + phoneNo.slice(-9);
    const vrfCode = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    try {
        await twilio.messages.create({
            body:
                "Thank you for getting started with My Virtual Shop,your verifcation code is " +
                vrfCode,
            from: "+18126252535",
            to: phoneNo,
        });

        await con.query("INSERT INTO SecretCodePhoneNo VALUES(?,?)", [
            phoneNo,
            vrfCode,
        ]);

        response.send("ok");

        setTimeout(
            () =>
                con
                    .query(
                        "DELETE FROM SecretCodePhoneNo WHERE phone_number=?",
                        phoneNo
                    )
                    .then((result) => console.log(result))
                    .catch((error) => console.log(error)),
            1000 * 60 * 2
        );
    } catch (error) {
        console.log(error);
        response.send("Something went wrong");
    }
});

router.post("/checkEmail", async ({ body }, response) => {
    const { email } = body;
    try {
        let [result] = await con.query(
            "SELECT * FROM Shop WHERE email=?",
            email
        );
        if (result.length > 0) return response.send("This email is taken");

        response.send("ok");
    } catch (error) {
        response.sendStatus(500);
    }
});

router.post("/checkPhone", async ({ body }, response) => {
    const { phoneNo } = body;
    try {
        let [result] = await con.query(
            "SELECT * FROM Shop WHERE phone_number=?",
            phoneNo
        );
        if (result.length > 0)
            return response.send("This Phone Number is taken");

        response.send("ok");
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

router.post(
    "/emailVerify/:email/:emailCode",
    ({ params, session }, response) => {
        const { email, emailCode } = params;
        con.query("SELECT * FROM SecretCodeEmail WHERE email=?", email)
            .then(([[{ code }]]) => {
                switch (emailCode) {
                    case code:
                        response.send("ok");
                        session.verfiedEmail = email;
                        break;
                    default:
                        response.send("Verification failed try again");
                }
            })
            .catch((error) => {console.log(error);response.sendStatus(500)});
    }
);

router.post("/phoneNoVerify/:phoneNo/:phoneNoCode", ({ params }, response) => {
    let { phoneNo, phoneNoCode } = params;
    phoneNo = "+94" + phoneNo.slice(-9);
    con.query("SELECT * FROM SecretCodePhoneNo WHERE phone_number=?", phoneNo)
        .then(([[{ code }]]) =>
            phoneNoCode === code
                ? response.send("ok")
                : response.send("Verification failed try again")
        )
        .catch((error) => {
            console.log(error);
            response.sendStatus(500);
        });
});
module.exports = router;

/*

   // if (error.sqlMessage.includes("Duplicate entry")) {
            //     if (error.sqlMessage.includes("phone_number"))
            //         return response.status(200).send({
            //             phoneNo: "Entered Phone Number is already exists",
            //         });

            //     if (error.sqlMessage.includes("email"))
            //         return response
            //             .status(200)
            //             .send({ email: "Entered Email is already exists" });
            // }

//callback based
//usually result come 2nd parameter
    con.query("SELECT MAX(shop_id) AS maxId FROM Shop", (error, result) =>
    {
        if (error)
        {
            console.log(error.message);
            response.send("failed");
            return;
        }

        console.log(result);

        if (result[0].maxId !== null)
        {
            shopId = result[0].maxId;
            let shopIdInt = shopId.split("-")[1];
            shopIdInt = (parseInt(shopIdInt) + 1).toString();
            shopIdInt = "0".repeat(6 - shopIdInt.length).concat(shopIdInt);
            shopId = "shop-".concat(shopIdInt);
        } else
        {
            shopId = "shop-000001";
        }

        let { shopName, email, pass, phoneNo, location } = request.body;
        bcrypt.hash(pass, saltRounds, (error, hash) =>
        {
            if (error)
            {
                console.log(error);
                return;
            }

            pass = hash;

            con.query(
                "INSERT INTO Shop VALUES(?,?,?,?,?,?)",
                [shopId, shopName, location, email, pass, phoneNo],
                (error, result) =>
                {
                    if (error)
                    {
                        if (error.sqlMessage.includes("Duplicate entry") && error.sqlMessage.includes("phone_number"))
                        {
                            return response.status(200).send({ phoneNo: "Entered Phone Number is already exists" });

                        }

                        if (error.sqlMessage.includes("Duplicate entry") && error.sqlMessage.includes("email"))
                        {
                            return response.status(200).send({ email: "Entered Email is already exists" });

                        }
                        return response.sendStatus(500);

                    }

                    result.affectedRows === 1 && response.sendStatus(201);

                }
            );
        });
    });
*/
