$(document).ready(function(){
    function showButton(){
        $(".buttons").removeClass("hide");
    }

    $("#deleteButton").click(function(event){
        var appointmentId = $(".AppointmentID").attr("id");
        console.log("Delete Appointment ID? ", appointmentId);
        $.ajax({
            url: "/delete",
            type: "post",
            data: { appointmentId: appointmentId },
            success: function(response) {
                var appDetails = $(".appDetails");
                var buttons = $(".buttons");
                appDetails.html(""); 
                appDetails.append(`<h2>Appointment deleted successfully</h2>`);
                buttons.addClass('hide');
                console.log("Appointment deleted successfully");
            },
            error: function(xhr, status, error) {
                console.error("Error deleting appointment: ", error);
            }
        });
    });
    $("#searchForm").submit(function(event){
        event.preventDefault();
        var searchTerm = $("#searchInput").val();
        console.log("searchTerm", searchTerm);
        $.ajax({
            url:"/search",
            type: "get",
            data:{search: searchTerm},
            success: function(data){
                var appDetails = $(".appDetails");
                appDetails.html(""); // Clear previous content

                data.forEach(function(appointment){
                    appDetails.append(`<p class='AppointmentID' id='${appointment.appt_id}'>Appointment ID:  ${appointment.appt_id} </p>`);
                    appDetails.append("<p>Status: " + appointment.status + "</p>");
                    appDetails.append("<p>Time Queued: " + appointment.time_queued + "</p>");
                    appDetails.append("<p>Queue Date: " + appointment.queue_date + "</p>");
                    appDetails.append("<p>Start Time: " + appointment.start_time + "</p>");
                    appDetails.append("<p>End Time: " + appointment.end_time + "</p>");
                });
                showButton();
            },
            error: function(xhr, status, error){
                console.error("Error searching appointments: ", error);
            }
        });
    });

    $(".InfoDiv").onclick(function(){
        $(".buttons").removeClass("hide");
    });
});