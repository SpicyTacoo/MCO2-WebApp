import "dotenv/config";
import express from "express";
import hbs from "hbs";
import path from "path";
import {fileURLToPath} from 'url';
import cors from "cors";
import bodyParser from "body-parser";
import { pool } from "./db/conn.js";
import { start } from "repl";

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


//starting hex code for ID
let initialId = 0


app.get("/", (req, res) => {
    res.redirect("/main");
});

app.get("/main", (req, res)=> {
    res.render("index")
})

app.get("/make-appointment", (req, res)=> {
    res.render("createAppointment")
})

app.post("/make-appointment", async (req, res)=> {
    const hexId = initialId.toString(16).padStart(32, '0')
    const curDate = new Date()

    const [numOfAppointmentId] = await pool.query(`SELECT COUNT(*) AS 'COUNT' FROM appointments`)

    const applicationId = numOfAppointmentId[0].COUNT.toString(16).padStart(32, '0')
    const patientId = hexId
    const clinicId = hexId
    const doctorId = hexId
    const status = "Queued"
    const timeQueued = curDate
    const queueDate = curDate
    const start_time = null 
    const end_time = null
    const type = req.body.appointmentType
    const isVirtual = req.body.virtual

    initialId += 1

    const result = await pool.query(`
                    INSERT INTO appointments (appt_id, patient_id, clinic_id, doctor_id, status, time_queued, queue_date, start_time, end_time, type, isVirtual)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `, [applicationId, patientId, clinicId, doctorId, status, timeQueued, queueDate, start_time, end_time, type, isVirtual])

    console.log(result)
})

app.get("/update-appointment", (req, res)=> {
    res.render("updateAppointment")
})

app.get("/check-appointment", (req, res)=> {
    res.render("checkAppointment")
})

app.get("/cancel-appointment", (req, res)=> {
    res.render("cancelAppointment")
})
app.get("/search", async (req, res)=>{
    const searchTerm = req.query.search;

    try{
        const [rows] = await pool.query("SELECT * FROM appointments WHERE appt_id LIKE ?", [`%${searchTerm}%`]);
        res.json(rows);
    }catch(error){
        console.error('Error searching appointments:', error);
        res.status(500).send('Error searching appointments');
    }
});

// connect to localhost
app.listen(3000, ()=> {
    console.log("Connected Successfully! Server is running on PORT: 3000");
<<<<<<< HEAD
});
=======
});

// async function getAppointments() {
//     const [rows] = await pool.query("SELECT * FROM appointments")
//     return rows
// }

//const appointment = await getAppointments()
// console.log(appointment)
>>>>>>> 6293bd4fde18fa2303a8aa9b409c2bdf4d10d150
