const submitButton = document.getElementById('appointment-form')
const searchButton = document.getElementById('searchForm')
const searchInput = document.getElementById('searchInput')

let url

searchButton.addEventListener('submit', (event) => {
    event.preventDefault();

    url = /update-appointment/ + searchInput.value
    window.location.href = url;
})

submitButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const clinicId = document.getElementById('clinic-id').value
    const doctorId = document.getElementById('doctor-id').value
    const appointmentStatus = document.getElementById('status').value
    const start_time = document.getElementById('start-time')
    const end_time = document.getElementById('end-time')
    const appointmentType = document.getElementById('appointment-type').value;
    const virtual = document.getElementById('is-virtual');

    let start_time_value = start_time.value
    let end_time_value = end_time.value

    if(start_time_value == "") {
        start_time_value = null
    }
    if(end_time_value == "") {
        end_time_value = null
    }

    url = /update-appointment/ + searchInput.value

        const formData = {
            clinicId: clinicId,
            doctorId: doctorId,
            status: appointmentStatus,
            startTime: start_time_value,
            endTime: end_time_value,
            appointmentType: appointmentType,
            virtual: virtual.checked ? 1 : 0,
        };

        try {
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit an appointment');
                }
                window.location.href = "/main";
            })
            .catch(error => {
                console.error('Error editing appointment:', error);
            });
        } catch (error) {
            console.error('Error editing appointment:', error);
        }
    
});