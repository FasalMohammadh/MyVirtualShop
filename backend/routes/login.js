const express = require("express");
const router = express.Router();
const con = require("../otherRes/DbConnection"); //importing database connection
const bcrypt = require("bcrypt"); //to compare entered pass and hased pass
const { generateCode, sendMail } = require("../otherRes/common");
const saltRounds = 10;

router.post("/", async (request, response) => {
    let { email, password } = request.body;

    if (email !== "" && password !== "") {
        try {
            const userPromise = con.query(
                "SELECT password,shop_id FROM Shop WHERE email=?",
                email
            );
            const adminPromise = con.query(
                "SELECT username FROM Administrator WHERE username=? AND password=?",
                [email, password]
            );

            const [[userResult], [adminResult]] = await Promise.all([
                userPromise,
                adminPromise,
            ]);

            if (adminResult.length) {
                request.session.role = "admin";
                return response.status(200).send("admin");
            }

            if (userResult.length === 0)
                return response.status(400).send("invalid email");

            let hashedPass = userResult[0].password,
                passCheck = await bcrypt.compare(password, hashedPass);
            if (passCheck) {
                request.session.shopId = userResult[0].shop_id;
                return response.status(200).send("user");
            }
            return response.sendStatus(400);
        } catch (error) {
            console.log(error.message);
            response.sendStatus(500);
        }
    } else response.sendStatus(400);
});

router.post("/forPass/passChange", async ({ body }, response) => {
    const { newPass, oldPass, email } = body;
    try {
        const newPassHashed = await bcrypt.hash(newPass, saltRounds);

        const [{ affectedRows }] = await con.query(
            "UPDATE Shop SET password=? WHERE email=?",
            [newPassHashed, email]
        );
        affectedRows ? response.sendStatus(200) : response.sendStatus(400);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

router.post("/forPass/:email", async ({ params }, response) => {
    //distructed both request and response objects
    const { email } = params;
    const vrfCode = generateCode(100000, 999999);
    try {
        const isMailSend = await sendMail(
            email,
            "My Virtual Shop forgot password",
            `Trouble signing in?<br>
            Resetting your password is easy. <br>
            Just Enter the below code in our website and follow the instructions.<br>
            We&#8217;ll have you up and running in no time.<br>
            ${vrfCode}<br>
            If you did not make this request then please ignore this email.`
        );

        await con.query("INSERT INTO SecretCodeEmail VALUES (?,?)", [
            email,
            vrfCode,
        ]);

        

        isMailSend ? response.sendStatus(200) : response.sendStatus(500);

        setTimeout(() => {
            con.query("DELETE FROM SecretCodeEmail WHERE email=?", email).catch(
                (error) => console.log(error)
            );
        }, 1000 * 60 * 2); //2 min in milliSec
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});



module.exports = router;

/*
con.promise().query("SELECT password FROM Shop WHERE email=?", [email])
            .then(result =>
            {
                if (result.length === 0) return response.sendStatus(400);
                return result[0].password;
            }).then(hash =>
            {
                bcrypt.compare(password, hash)
                    .then(passChkResult =>
                    {
                        if (passChkResult)
                        {
                            request.session.email = email;
                            return response.sendStatus(200);
                        }
                        return response.sendStatus(400);
                    }).catch(error => console.log(error));
            }).catch(error=> {
                console.log(error);
                response.sendStatus(500);
            });
    } else return response.sendStatus(400); */

/* with callbacks
 con.query("SELECT password FROM Shop WHERE email=?", [email], (error, result) =>
        {
            if (error || result.length === 0)
            {
                return error ? response.sendStatus(500) : response.sendStatus(400);
            }

            let hash = result[0].password;

            bcrypt.compare(password, hash)
                .then(passChkResult =>
                {
                    if (passChkResult)
                    {
                        request.session.email = email;
                        return response.sendStatus(200);
                    }
                    return response.sendStatus(400);
                })
                .catch(error => console.log(error));

        });
*/
