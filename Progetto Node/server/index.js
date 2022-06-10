const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());


const fs = require('fs');
let users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
let count = 7;

// GET

app.get('/api/users', (request, response) => {
    response.json(users);
})

app.get('/api/users/:id', (request, response) => {
    const id = request.params.id;
    users.forEach(ele => {
        if(ele.id === +id) {
            response.json(ele);
            return;
        }
    })
})

// POST
app.post('/api/users', (request, response) => {
    const obj = request.body;
    obj.id = count++;
    console.log(obj);
    users.push(obj);
    response.json('Utente Aggiunto nel DB');
})

// PUT
app.put('/api/users/:id', (request, response) => {
    const id = request.params.id;
    const obj_mod = request.body;

    let index = users.findIndex(ele => ele.id === +id);
    users.splice(index, 1, obj_mod);

    response.json('Utente Modificato nel DB');
})


// DELETE
app.delete('/api/users/:id', (request, response) => {

    const id = request.params.id;
    users = users.filter(ele => ele.id !== +id);

    response.json('Utente Eliminato dal DB');
})

app.listen(port, () => console.log('Server attivo sulla porta 3000'));