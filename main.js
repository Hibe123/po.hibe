document.getElementById('date-form').addEventListener('submit', function(e) {
    e.preventDefault();
    try {
        const isValid = validateDateTime();
        if (isValid) {
            setNewDate();
        } else {
            alert("Please select a future date and time.");
        }
    } catch (error) {
        console.error('Error setting new date:', error);
    }
});

const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');

let countdown;

function updateCountdown(endTime) {
    clearInterval(countdown);
    countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysSpan.textContent = days.toString().padStart(2, '0');
            hoursSpan.textContent = hours.toString().padStart(2, '0');
            minutesSpan.textContent = minutes.toString().padStart(2, '0');
            secondsSpan.textContent = seconds.toString().padStart(2, '0');
        } else {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "Etkinlik Zamanı Geldi!";
        }
    }, 1000);
}

function setNewDate() {
    const dateValue = document.getElementById('event-date').value;
    const timeValue = document.getElementById('event-time').value;
    const dateTimeString = `${dateValue}T${timeValue}`;
    const newDate = new Date(dateTimeString);
    updateCountdown(newDate.getTime());
}

function validateDateTime() {
    const dateValue = document.getElementById('event-date').value;
    const timeValue = document.getElementById('event-time').value;
    const dateTimeString = `${dateValue}T${timeValue}`;
    const selectedDateTime = new Date(dateTimeString);
    const now = new Date();

    return selectedDateTime > now;
}
