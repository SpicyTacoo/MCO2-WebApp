const createAppointmentButton = document.getElementById("create-appointment");
const checkAppointmentButton = document.getElementById("check-appointment");
const updateAppointmentButton = document.getElementById("update-appointment");
const cancelAppointmentButton = document.getElementById("cancel-appointment");

createAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Make An Appointment!")

    location.href = "/make-appointment"
})

checkAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Check An Appointment!")

    location.href = "/check-appointment"
})

updateAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Update An Appointment!")

    location.href = "/update-appointment"
})

cancelAppointmentButton?.addEventListener("click" , function(e) {
    console.log("Cancel An Appointment!")

    location.href = "/cancel-appointment"
})

