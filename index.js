const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv =require("dotenv");
const cookieParser =require("cookie-parser");

const config =require("./app/config/config.js");
const routerWeb =require("./app/routes/web.js");
const routerApi =require("./app/routes/api.js");
const corsOption = require("./app/config/cors.js");

const app = express();

//Base URL
const url = config.baseUrl().url;
const port = config.baseUrl().port;

//Dotenv Load
dotenv.config();

//View Engine
app.set("views", path.join("app", "views"));
app.set("view engine", "hbs");

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cookie Parser
app.use(cookieParser());

//Public Load
app.use("/assets", express.static("public"));

//Routes
app.use("/", routerWeb);
app.use("/api", corsOption, routerApi);

// Listen on port
app.listen(port, () => console.log(`Server Running at ${url}`));
