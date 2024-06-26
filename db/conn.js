import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config()

let poolStatus
let poolStatus2
let poolStatus3

export const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
})

export const pool2 = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT2
})

export const pool3 = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT3
})


pool.on('connection', function(connection) {
    console.log('connected to db on port 20186')

    connection.on('error', function (e) {
        console.error(new Date(), 'MySQL error', e.code)
    })

    connection.on('close', function (e) {
        console.error(new Date(), 'MySQL close', e)
    })
})

pool2.on('connection', function(connection) {
    console.log('connected to db on port 20187')

    connection.on('error', function (e) {
        console.error(new Date(), 'MySQL error', e.code)
    })

    connection.on('close', function (e) {
        console.error(new Date(), 'MySQL close', e)
    })
})

pool3.on('connection', function(connection) {
    console.log('connected to db on port 20188')

    connection.on('error', function (e) {
        console.error(new Date(), 'MySQL error', e.code)
    })

    connection.on('close', function (e) {
        console.error(new Date(), 'MySQL close', e)
    })
})


new Promise( async (resolve, reject) => { 
    await pool.getConnection((err, con) => {
        try {
            if(con) {
                con.release();
                resolve({"status":"success", "data":"MySQL connected.", "con":pool})
                
                console.log("Success")
            }
        }
        catch (err) {
            reject({"status":"failed", "error":`MySQL error. ${err}`})
            console.log("Fail")
        }
        resolve({"status":"failed", "error":"Error connecting to MySQL."})
    })
}).then((result) => {
    poolStatus = result.status;
})

new Promise( async (resolve, reject) => { 
    await pool2.getConnection((err, con) => {
        try {
            if(con) {
                con.release();
                resolve({"status":"success", "data":"MySQL connected.", "con":pool2})
                
                console.log("Success")
            }
        }
        catch (err) {
            reject({"status":"failed", "error":`MySQL error. ${err}`})
            console.log("Fail")
        }
        resolve({"status":"failed", "error":"Error connecting to MySQL."})
    })
}).then((result) => {
    poolStatus2 = result.status;
})

new Promise( async (resolve, reject) => { 
    await pool3.getConnection((err, con) => {
        try {
            if(con) {
                con.release();
                resolve({"status":"success", "data":"MySQL connected.", "con":pool3})
                
                console.log("Success")
            }
        }
        catch (err) {
            reject({"status":"failed", "error":`MySQL error. ${err}`})
            console.log("Fail")
        }
        resolve({"status":"failed", "error":"Error connecting to MySQL."})
    })
}).then((result) => {
    poolStatus3 = result.status;

})

console.log(poolStatus)
console.log(poolStatus2)
console.log(poolStatus3)
export {poolStatus, poolStatus2, poolStatus3}

function signalHandler() {
    console.log("Closing MySQL Connection...")
    pool.end(function (err) {
        if(err) console.error("An error occured: " + err)
        else console.log("Succesfully Terminated...")
    })
    process.exit()
}

process.on("SIGINT", signalHandler)
process.on("SIGTERM", signalHandler)
process.on("SIGQUIT", signalHandler)


// testing query after connecting

// async function getAppointments() {
//     const [rows] = await pool.promise().query("SELECT * FROM appointments LIMIT 5")
//     return rows
// }

// const appointment = await getAppointments()
// console.log(appointment)