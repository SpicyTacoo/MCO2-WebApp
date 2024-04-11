const submitButton = document.getElementById('appointment-form')

const appointmentType = document.getElementById('appointment-type').value;
const virtual = document.getElementById('is-virtual');

submitButton.addEventListener('submit', (event) => {
    event.preventDefault();

        const formData = {
            appointmentType: appointmentType,
            virtual: virtual.checked ? 1 : 0,
        };

        try {
            fetch('/make-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to make an appointment');
                }
                window.location.href = '/main';
            })
            .catch(error => {
                console.error('Error making an appointment:', error);
            });
        } catch (error) {
            console.error('Error making an appointment:', error);
        }
    
});