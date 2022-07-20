const con = require("../otherRes/DbConnection");
const bcrypt = require("bcrypt");
const mailer = require("nodemailer");

const isCorrectPassword = (password, shopId) => {
    return new Promise((resolve, reject) => {
        con.query("SELECT password FROM Shop WHERE shop_id=?", shopId)
            .then((result) => {
                let oldPassHashed = result[0][0].password;
                bcrypt
                    .compare(password, oldPassHashed)
                    .then((result) => resolve(result))
                    .catch((error) => reject(error));
            })
            .catch((error) => reject(error));
    });
};

const generateCode = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const sendMail = async (recEmail, subject, body) => {
    senderMail = "myvirtualshopofficial@gmail.com";
    const mailTransporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: senderMail,
            pass: "Shop1234",
        },
    });

    let isMailSend;

    try {
        await mailTransporter.sendMail({
            from: senderMail,
            to: recEmail,
            subject: subject,
            html: body,
        });
        isMailSend = true;
    } catch (err) {
        console.log(err);
        isMailSend = false;
    }

    return isMailSend;
};

module.exports = {
    isCorrectPassword,
    generateCode,
    sendMail,
};

//query will return [[actualresult],[otherdata]]
//performing an array destruction to get only result
