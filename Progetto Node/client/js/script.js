let urlAPI = "http://localhost:3000/api/users/";

let promise = fetch(urlAPI).then(res => res.json());

let modal = document.querySelector(".modal");

let modalTitle = document.querySelector(".modal h2");

let addBtn = document.querySelector(".addBtn");

class User {
    constructor(username, firstName, lastName, gender, profileURL, email, job) {
        this.username = username;
        this.firstName = firstName,
            this.lastName = lastName,
            this.gender = gender;
        this.profileURL = profileURL;
        this.email = email;
        this.job = job;
    }
}

let input = document.querySelectorAll(".modal input");
var gender = document.getElementById("gender");
let confirmBtn = document.querySelector(".modal button");

let username = input[0];
let email = input[1];
let nome = input[2];
let cognome = input[3];
let profileURL = input[4];
let job = input[5];

profileURL.value = "https://joeschmoe.io/api/v1/random";


function getURL() {
    if (gender.value === "Male") {
        profileURL.value = "https://joeschmoe.io/api/v1/male/random";
    } else if (gender.value === "Female") {
        profileURL.value = "https://joeschmoe.io/api/v1/female/random";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    promise.then(json => showUser(json));
})

addBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modalTitle.innerHTML = "Add an User"
    username.value = "";
    email.value = "";
    nome.value = "";
    cognome.value = "";
    profileURL.value = "https://joeschmoe.io/api/v1/random";
    job.value = "";

    confirmBtn.style.display='block';

    if (username.hasAttribute('disabled')) {
        input.forEach(input => {
            input.removeAttribute('disabled')
        })
    };

    profileURL.setAttribute('disabled', '');

    confirmBtn.addEventListener('click', addUser);
});

window.onclick = function (event) {
    if (event.target == modal) {
        modal.classList.remove('open');
    }
}


function showUser(users) {
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = "";
    users.forEach(user => {
        let card = document.createElement('div');
        card.classList.add('card');
        let topCard = document.createElement('div');
        topCard.classList.add('top-card');
        let gestione = document.createElement('div');
        gestione.classList.add('gestione');
        let trash = document.createElement('div');
        trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        trash.setAttribute('onclick', `removeUser(${user.id})`);
        let pencil = document.createElement('div');
        pencil.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
        pencil.setAttribute('onclick', `updateUser(${user.id})`);
        let img = document.createElement('img');
        img.src = user.profileURL;
        let name = document.createElement('h4');
        name.innerHTML = user.firstName + " " + user.lastName;
        let mail = document.createElement('p');
        mail.innerHTML = user.email;
        let bottomCard = document.createElement('div');
        bottomCard.classList.add('bottom-card');
        let job = document.createElement('p');
        job.innerHTML = user.job;

        wrapper.appendChild(card);
        card.appendChild(topCard);
        card.appendChild(bottomCard);
        topCard.appendChild(img);
        topCard.appendChild(name);
        topCard.appendChild(mail);
        topCard.appendChild(gestione);
        gestione.appendChild(trash);
        gestione.appendChild(pencil);
        bottomCard.appendChild(job);
    });
}

function addUser() {

    let newUser = new User(username.value,
        firstname.value, lastname.value, gender.value,
        profileURL.value, email.value, job.value);

    console.log(newUser);

    fetch(urlAPI, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json()).then(json => {
        fetch(urlAPI).then(res => res.json()).then(users => showUser(users));
    });

    username.value = "";
    email.value = "";
    nome.value = "";
    cognome.value = "";
    profileURL.value = "https://joeschmoe.io/api/v1/random";
    job.value = "";

    modal.classList.remove('open');

}

function removeUser(id) {

    let newurl = urlAPI + id;

    fetch(newurl, {
        method: "DELETE"
    }).then(res => res.json()).then(json => {
        fetch(urlAPI).then(res => res.json()).then(users => showUser(users));
    });

}

function updateUser(id) {

    modal.classList.add('open')
    modalTitle.innerHTML = "User Detail"

    let urlupdate = urlAPI + id;

    fetch(urlupdate).then(res => res.json()).then(user => {
        nome.value = user.firstName;
        cognome.value = user.lastName;
        email.value = user.email;
        username.value = user.username;
        job.value = user.job;
        gender.value = user.gender;
        profileURL.value = user.profileURL;
    })

    input.forEach(input => {
        input.setAttribute('disabled', '');
    })

    confirmBtn.style.display='none';

}