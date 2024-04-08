import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getPatients() {
    const [rows] = await pool.query("SELECT * FROM px")
    return rows
}

const px = await getPatients()
// console.log(px)