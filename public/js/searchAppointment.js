$(document).ready(function(){
    function showButton(){
        $(".buttons").removeClass("hide");
    }

    $("#searchForm").submit(function(event){
        event.preventDefault();
        var searchTerm = $("#searchInput").val();
        var port = '{{port}}';
        console.log("searchTerm", searchTerm);
        $.ajax({
            url:"/" + port + "/check",
            type: "get",
            data:{search: searchTerm},
            success: function(data){
                var appDetails = $(".appDetails");
                appDetails.html(""); // Clear previous content
                console.log("data", data);

                data.forEach(function(appointment){
                    appDetails.append("<p>Appointment ID: " + appointment.appt_id + "</p>");
                    appDetails.append("<p>Status: " + appointment.status + "</p>");
                    appDetails.append("<p>Time Queued: " + appointment.time_queued + "</p>");
                    appDetails.append("<p>Queue Date: " + appointment.queue_date + "</p>");
                    appDetails.append("<p>Start Time: " + appointment.start_time + "</p>");
                    appDetails.append("<p>End Time: " + appointment.end_time + "</p>");

                });
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