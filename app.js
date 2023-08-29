const dataContainer = document.querySelector(".dataContainer");
const addButton = document.querySelector(".adder");
let parties = [];
// let ids = [];

getParties();

async function getParties(){
    const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events");
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
        <button class="delete" id="${obj.id}">Delete</button>
        </div>
        `;
    }).join('');
    dataContainer.innerHTML = html;
    // ids = getIds(parties);
}

dataContainer.addEventListener("click", function(event) {
    if(event.target.tagName === "BUTTON"){
        if(event.target.innerText === "Delete"){
            const confirm = window.confirm("Are you sure you want to delete this party?");
            if(confirm){
                parties = parties.filter((obj) => {
                    if(obj.id != event.target.id){
                        return obj;
                    }
                })
            }
        }
    }
    renderParties();
})

// function getIds(arr){
//     const ids = [];
//     arr.forEach((obj) => {
//         ids.push(obj.id);
//     })
//     return ids
// }

addButton.addEventListener("click", function(event) {
    const newParty = {};
    newParty.id = Math.ceil(Math.random()*1000);
    newParty.name = window.prompt("Enter the party name!", "New Party");
    newParty.description = window.prompt("Enter a description!", "Let's see if we can add a new party!");
    newParty.date= window.prompt("Enter a date and time!", "2023-8-28T18:40:00.000Z");
    newParty.location = window.prompt("Enter the address!", "321 party Lane");
    newParty.cohortID = window.prompt("Enter your cohort ID!", "2307");
    parties.push(newParty);
    renderParties();
})