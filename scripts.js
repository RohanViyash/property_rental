
const properties = [
    { id: 1, name: "Cozy Apartment", location: "New York", price: "$150/night" },
    { id: 2, name: "Luxury Villa", location: "Los Angeles", price: "$450/night" },
    { id: 3, name: "Beach House", location: "Miami", price: "$250/night" },
];


function displayProperties(filteredProperties = properties) {
    const propertyList = document.getElementById('property-list');
    propertyList.innerHTML = '';
    filteredProperties.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'property-item';
        propertyItem.innerHTML = `
            <h3>${property.name}</h3>
            <p>Location: ${property.location}</p>
            <p>Price: ${property.price}</p>
            <a href="booking.html?propertyId=${property.id}">Book Now</a>
        `;
        propertyList.appendChild(propertyItem);
    });
}


function populateBookingForm() {
    const propertySelect = document.getElementById('property');
    properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.id;
        option.textContent = property.name;
        propertySelect.appendChild(option);
    });
}


function handleBooking(event) {
    event.preventDefault();
    const propertyId = document.getElementById('property').value;
    const name = document.getElementById('name').value;
    const property = properties.find(p => p.id == propertyId);
    const booking = {
        property: property.name,
        location: property.location,
        price: property.price,
        name: name,
        date: new Date().toLocaleString()
    };
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookingHistory();
    showModal(`Booking confirmed for ${property.name} by ${name}.`);
}

// Function to display booking history
function displayBookingHistory() {
    const bookingHistory = document.getElementById('booking-history');
    bookingHistory.innerHTML = '';
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.forEach(booking => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item';
        bookingItem.innerHTML = `
            <h3>${booking.property}</h3>
            <p>Location: ${booking.location}</p>
            <p>Price: ${booking.price}</p>
            <p>Booked by: ${booking.name}</p>
            <p>Date: ${booking.date}</p>
        `;
        bookingHistory.appendChild(bookingItem);
    });
}

// Function to filter properties
function filterProperties() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredProperties = properties.filter(property => 
        property.name.toLowerCase().includes(searchTerm) ||
        property.location.toLowerCase().includes(searchTerm)
    );
    displayProperties(filteredProperties);
}

// Function to show modal
function showModal(message) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    modalText.textContent = message;
    modal.style.display = "block";
}

// Function to close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('property-list')) {
        displayProperties();
        document.getElementById('search').addEventListener('input', filterProperties);
    }
    if (document.getElementById('booking-form')) {
        populateBookingForm();
        document.getElementById('booking-form').addEventListener('submit', handleBooking);
        displayBookingHistory();
    }

    // Modal close button
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', event => {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModal();
        }
    });
});
