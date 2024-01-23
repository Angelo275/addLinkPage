let currentPage = 1;
let totalContacts = 0;
let totalPages = 1; 

function fetchTotalContacts() {
    fetch('https://randomuser.me/api/?results=53')
        .then(response => response.json())
        .then(data => {
            totalContacts = data.info.results;
            totalPages = Math.ceil(totalContacts / 10); 
            updateTotalContacts();
            createPaginationButtons();
        })
        .catch(error => console.error('Error fetching total contacts:', error));
}

function loadContacts(page) {
    fetch(`https://randomuser.me/api/?people?page=${page}&results=10`)
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById('contactList');

            contactList.innerHTML = '';

            data.results.forEach(person => {
                const contactCard = document.createElement('div');
                contactCard.className = 'contact';
                contactCard.innerHTML = `
                    <div class="contact-item cf">
                        <div class="contact-details">
                            <img class="avatar" src="${person.picture.thumbnail}">
                            <h3>${person.name.first} ${person.name.last}</h3>                 
                            <p>Email: ${person.email}</p>
                        </div>
                        <div class="joined-details">
                            <span class="date">${person.login.username}</span>
                        </div>
                    </div>
                `;
                contactList.appendChild(contactCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

function updateTotalContacts() {
    const totalContactsElement = document.getElementById('totalContacts');
    totalContactsElement.textContent = totalContacts;
}

function createPaginationButtons() {
    const paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
            currentPage = i;
            loadContacts(currentPage);
        });
        paginationDiv.appendChild(button);
    }
}

fetchTotalContacts();
loadContacts(currentPage);