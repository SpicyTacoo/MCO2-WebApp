const createAppointmentButton = document.getElementById("create-appointment");
const checkAppointmentButton = document.getElementById("check-appointment");
const updateAppointmentButton = document.getElementById("update-appointment");
const cancelAppointmentButton = document.getElementById("cancel-appointment");
let url

createAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Make An Appointment!")
    const portList = document.getElementById("port")
    url = "/" + portList.value + "/make-appointment"
    location.href = url
})

checkAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Check An Appointment!")
    const portList = document.getElementById("port")
    url = "/" + portList.value + "/check-appointment"
    location.href = url
})

updateAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Update An Appointment!")
    const portList = document.getElementById("port")
    url = "/" + portList.value + "/update-appointment"
    location.href = url
})

cancelAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Delete An Appointment!")
    const portList = document.getElementById("port")
    url = "/" + portList.value + "/cancel-appointment"
    location.href = url
})

