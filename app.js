
const dataContainer = document.querySelector(".dataContainer");
let parties = [];

async function getParties(){
    const response = await fetch('https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events');
    const data = await response.json();
    parties = data.data;
    renderParties();
}

function renderParties(){
    const html = parties.map((obj) => {
        return `
        <div class="party">
        <h3>${obj.name}</h3>
        <p>${obj.description}</p>
        <p>${obj.date}</p>
        <p>${obj.location}</p>
        <button class="delete">Delete</button>
        </div>
        `;
    }).join('');
    dataContainer.innerHTML = html;
}
getParties();