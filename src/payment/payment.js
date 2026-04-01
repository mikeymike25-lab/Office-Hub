function selectOption(element) {
    // Remove active style from all options
    const options = document.querySelectorAll('.pay-option');
    options.forEach(opt => opt.style.border = "none");
    
    // Highlight the selected one
    element.style.border = "2px solid #1a2e44";
}

document.getElementById('payButton').addEventListener('click', function() {
    const amount = document.getElementById('total-amount').innerText;
    alert('Processing payment for ' + amount + '...');
});

function showReceipt(methodName) {
    // 1. Show the modal
    const modal = document.getElementById("receiptModal");
    modal.style.display = "flex";

    // 2. Grab data from LocalStorage
    const savedName = localStorage.getItem("customerName") || "Not Provided";
    const savedDate = localStorage.getItem("selectedBookingDate") || "Date Not Selected";
    const savedRoom = "Quiet Corner"; // You can set this from localStorage too

    // 3. Debugging (Check your browser console to see these!)
    console.log("Name Found:", savedName);
    console.log("Date Found:", savedDate);

    // 4. Inject into the Modal
    document.getElementById("res-name").innerText = savedName;
    document.getElementById("res-date").innerText = savedDate;
    document.getElementById("res-room").innerText = savedRoom;
    document.getElementById("res-method").innerText = methodName;
}

function closeReceipt() {
    document.getElementById("receiptModal").style.display = "none";
}

function finalSubmit() {
    // 1. (Optional) Show a success message
    alert("Payment Successful! Redirecting to your dashboard...");

    // 2. Clear the booking data so it's ready for the next booking
    // This keeps the dashboard clean but removes the "temporary" booking info
    localStorage.removeItem("selectedBookingDate");
    localStorage.removeItem("customerName");
    localStorage.removeItem("customerContact");

    // 3. The magic line: Redirect to dashboard
    window.location.href = "dashboard.html"; 
}