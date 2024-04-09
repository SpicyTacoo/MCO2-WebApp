import "dotenv/config";
import express from "express";
import hbs from "hbs";
import path from "path";
import {fileURLToPath} from 'url';
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./db/conn.js";

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

// connect to localhost
app.listen(3000, ()=> {
    console.log("Connected Successfully! Server is running on PORT: 3000");
});

async function getAppointments() {
    const [rows] = await pool.query("SELECT * FROM appointments")
    return rows
}

const appointment = await getAppointments()
console.log(appointment)