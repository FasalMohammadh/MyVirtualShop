const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");
const addProduct = require("./routes/addProduct");
const filterProducts = require("./routes/filterProducts");
const logout = require("./routes/logout");
const shopProducts = require("./routes/shopProducts");
const changePass = require("./routes/changePass");
const shopRoutes = require("./routes/shopRoutes");
const adminRoutes = require("./routes/adminRoutes");
const countRoutes = require("./routes/countRoutes");
const productRoutes = require("./routes/productRoutes");

const express = require("express");
const cors = require("cors");
const con = require("./otherRes/DbConnection.js");
const session = require("express-session");
const mySQLStore = require("express-mysql-session")(session);
const sessionStore = new mySQLStore({ createDatabaseTable: true }, con);

const app = express();
const expirySessionCookie = 24 * 60 * 60 * 1000; //one day in milleseconds

app.use(express.static("prdImgs"));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        exposedHeaders: ["set-cookie"],
    })
);

app.use(
    session({
        name: "id",
        secret: "secret-session",
        //this will be used to sign the cookie sent to the user
        saveUninitialized: false,
        /*for example for each and every login attempt we create a session at the end
         if login successful we modify session or we not modify newly created session 
         and it will be empty. if saveuninitialized is true it stores empty sessions if false 
         it doesnt store the new empty session in session store*/
        cookie: { maxAge: expirySessionCookie, httpOnly: false, secure: false },
        resave: false,
        //each and every request we check the session was modified when resave false session is resaved only if session modified
        store: sessionStore,
        //by default session uses memory as store but when webserver restart all the sessions are lost so that here
        //mysql db used as session store with the help of express-mysql-session dependency
    })
);

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/addproduct", addProduct);
app.use("/submitFilters", filterProducts);
app.use("/logout", logout);
app.use("/shopProducts", shopProducts);
app.use("/changePass", changePass);
app.use("/shop", shopRoutes);
app.use("/admin", adminRoutes);
app.use("/count", countRoutes);
app.use("/products", productRoutes);

// app.post("/getOneProduct", (request, response) => {
//     console.log(request.session);
//     con.query(
//         "SELECT * FROM Product WHERE product_id=?",
//         [request.body.productId],
//         (error, result) => {
//             if (error) return console.log(error);

//             if (result.length > 0) {
//                 let productCat = result[0].category,
//                     query;

//                 switch (productCat) {
//                     case "SmartPhone":
//                         query = `
//                         SELECT
//                             *
//                             FROM
//                             Product
//                             JOIN (
//                                 SELECT
//                                 *
//                                 FROM
//                                 SmartPhone
//                                 JOIN (
//                                     SELECT
//                                     smart_phone_id,
//                                     GROUP_CONCAT(sensors) as sensors
//                                     FROM
//                                     SmartPhoneSensors
//                                 ) as smrtSensors USING (smart_phone_id)
//                             ) as smrt using(product_id) 
//                                 JOIN (
//                                 SELECT product_id,GROUP_CONCAT(image_path) AS image_paths FROM ProductImage 
//                                 )as prdImg 
//                                 using(product_id)
//                                 WHERE product_id=?`;
//                         break;
//                 }

//                 con.query(query, [request.body.productId], (error, result) => {
//                     if (error) return console.log(error);

//                     let { sensors, image_paths, ...others } = result[0];

//                     sensors = sensors.split(",");
//                     image_paths = image_paths.split(",");
//                     others.sensors = sensors;
//                     others.image_paths = image_paths;
//                     response.send(others);
//                 });
//             }
//         }
//     );
// });

app.post("/getAllProducts", async (_request, response) => {
    try {
        let result = await con.query(
            "SELECT p.*,pI.image_path,sh.shop_name,sh.location FROM Product p LEFT JOIN (SELECT * FROM ProductImage GROUP BY ProductImage.product_id) as pI USING(product_id) JOIN Shop sh USING(shop_id)"
        );
        return result[0].length > 0
            ? response.send(result[0])
            : response.send("no records");
    } catch (error) {
        return response.sendStatus(500); //we can call res.status(500).send() or res.status(500).end() or res.sendStatus(500)
    }
});

// app.post("/shopsAll", (request, response) => {
//     con.query(
//         "SELECT shop_id,shop_name,location,email,phone_number FROM Shop WHERE enabled_status=1"
//     )
//         .then(([results]) => {
//             return response.send(results);
//         })
//         .catch((error) => {
//             console.log(error);
//             response.sendStatus(500);
//         });
// });

app.post("/shopsAll/filtered", async ({ body }, response) => {
    try {
        let { locs } = body;
        query =
            "SELECT shop_id,shop_name,location,email,phone_number FROM Shop WHERE enabled_status=1 ";

        if (locs && locs.length > 0) {
            query += "AND location IN(";
            for (let loc of locs) {
                query += "?";
                if (locs.indexOf(loc) !== locs.length - 1) query += ",";
            }
            query += ")";
        }

        const [results] = locs
            ? await con.query(query, locs)
            : await con.query(query);

        return response.send(results);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }
});

app.listen(3010, () => console.log("server running"));