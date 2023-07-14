import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();
let port = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config app

viewEngine(app);
initWebRoutes(app);

connectDB();

app.listen(port, () => {
    console.log(`Backend Nodejs is running on the port: ${port}`);
});
