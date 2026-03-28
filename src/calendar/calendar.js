let date = new Date();
const today = new Date(); // Keeps track of the real current date
today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

function renderCalendar() {
    date.setDate(1);
    const monthDays = document.getElementById("calendarDays");
    const monthDisplay = document.getElementById("monthDisplay");
    
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const firstDayIndex = date.getDay();
    
    const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 
                    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    monthDisplay.innerText = months[date.getMonth()];
    let days = "";

    // 1. Previous Month Dates (Always disabled)
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="day prev-date disabled">${prevLastDay - x + 1}</div>`;
    }

    // 2. Current Month Dates
    for (let i = 1; i <= lastDay; i++) {
        const checkDate = new Date(date.getFullYear(), date.getMonth(), i);
        const isToday = checkDate.getTime() === today.getTime();
        const isPast = checkDate < today;

        // Add 'disabled' class if the date is in the past
        const dayClass = isPast ? "day disabled" : (isToday ? "day today" : "day");
        
        // Only add the onclick function if the date is NOT in the past
        const clickHandler = isPast ? "" : `onclick="selectDate(${i})"`;

        days += `<div class="${dayClass}" ${clickHandler}>${i}</div>`;
    }

    monthDays.innerHTML = days;
}

function selectDate(day) {
    const month = document.getElementById("monthDisplay").innerText;
    const year = date.getFullYear();
    
    // Final safety check: don't allow selection if someone manages to click a past date
    const selectedDate = new Date(year, date.getMonth(), day);
    if (selectedDate < today) return;

    localStorage.setItem("selectedBookingDate", `${month} ${day}, ${year}`);
    window.location.href = "payment.html";
}

function changeMonth(dir) {
    date.setMonth(date.getMonth() + dir);
    renderCalendar();
}

renderCalendar();