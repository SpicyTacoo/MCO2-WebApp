import "dotenv/config";
import express from "express";
import hbs from "hbs";
import path from "path";
import {fileURLToPath} from 'url';
import cors from "cors";
import bodyParser from "body-parser";
import {} from "./db/conn.js";
// import { ObjectId } from 'mongodb';
// import { connectToMongo, getDb } from "./db/conn.js";
// import mongoose from "mongoose";

// to allow __dirname to work in ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.set("view engine", "hbs")

hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/", (req, res) => {
    res.redirect("/main");
});

app.get("/main", (req, res)=> {
    res.render("index")
})

app.get("/make-appointment", (req, res)=> {
    res.render("createAppointment")
})

app.get("/update-appointment", (req, res)=> {
    res.render("checkAppointment")
})

app.get("/check-appointment", (req, res)=> {
    res.render("updateAppointment")
})

app.get("/cancel-appointment", (req, res)=> {
    res.render("cancelAppointment")
})
// connect to database
// connectToMongo(() => {
//     console.log("Connected to MySQL");
// });

// connect to localhost
app.listen(3000, ()=> {
    console.log("Connected Successfully! Server is running on PORT: 3000");
    // mongoose.connect(process.env.MONGODB_URI, { dbName: process.env.DB_NAME });
});