function openModal(card) {
    // Extract info from data attributes
    const title = card.getAttribute('data-title');
    const duration = card.getAttribute('data-duration');
    const price = card.getAttribute('data-price');
    const capacity = card.getAttribute('data-capacity');
    const img = card.getAttribute('data-img');

    // Update Modal Text
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-duration').innerText = "Duration: " + duration;
    document.getElementById('modal-price').innerText = "Price: " + price;
    document.getElementById('modal-capacity').innerText = "Capacity: " + capacity;

    // Update Modal Image Preview
    const previewBg = document.querySelector('.selection-preview');
    if (previewBg) {
        // We apply the same gradient so the white text is readable in the modal too
        previewBg.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${img}')`;
    }

    document.getElementById('bookingModal').style.display = 'flex';

    // 5. Optional: Store the selected room in localStorage for the receipt page later
    localStorage.setItem("selectedRoom", title);
}

// Keep your existing closeModal function
function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

// Close modal if user clicks outside of the content box
window.onclick = function(event) {
    let modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeModal();
    }
}

// In your service.js, update the CALENDAR button click:
document.querySelector('.btn-calendar').addEventListener('click', () => {
    const name = document.querySelector('input[placeholder="name"]').value;
    const contact = document.querySelector('input[placeholder="Phone no / gmail"]').value;

    localStorage.setItem("customerName", name);
    localStorage.setItem("customerContact", contact);

    window.location.href = "../calendar/calendar.html";
});