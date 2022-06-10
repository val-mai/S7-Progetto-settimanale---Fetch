let url = "../json/users.json";

let promise = fetch(url).then(res => res.json());

document.addEventListener('DOMContentLoaded', () => {
    promise.then(json => showUser(json));
})

function showUser(users) {
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = "";
    users.forEach(user => {
        let card = document.createElement('div');
        card.classList.add('card');
        let topCard = document.createElement('div');
        topCard.classList.add('top-card');
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
        bottomCard.appendChild(job);
    });
}