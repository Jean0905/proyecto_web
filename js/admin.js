const form = document.getElementById('registrationForm');
const tableBody = document.querySelector('#userTable tbody');

const JSONBIN_URL = 'https://api.jsonbin.io/v3/b/670074b1e41b4d34e43d1b6d';
const API_KEY = 'YOUR_SECRET_KEY';

const fetchUsers = () =>
    fetch(JSONBIN_URL + '/latest', {
        headers: { 'X-Master-Key': API_KEY }
    })
        .then(response => response.json())
        .then(data => data.record || [])
        .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            return [];
        });

const saveUser = (user) => {
    fetchUsers().then(users => {
        users.push(user);
        fetch(JSONBIN_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': API_KEY
            },
            body: JSON.stringify(users)
        })
            .catch(error => console.error('Error al guardar el usuario:', error));
    });
};

const displayUsers = (users) => {
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = `<tr><td>${user.name}</td><td>${user.email}</td><td>${user.age}</td></tr>`;
        tableBody.innerHTML += row;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers().then(displayUsers);
});

form.onsubmit = (e) => {
    e.preventDefault();

    // Obtener los datos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;

    const newUser = { name, email, age };

    saveUser(newUser);
    fetchUsers().then(displayUsers);

    form.reset();
};

const cambiarNombre = () => {
    let nombreJson = localStorage.getItem('llaveName');
    if (!nombreJson) {
        nombreJson = "nombre no encontrado";
    }
    alert(nombreJson);
    console.log(nombreJson);

    const nuevoNombre = nombreJson;
    if (nuevoNombre) {
        document.getElementById("nombreUsuario").innerHTML = nuevoNombre; // Asegúrate de que este ID coincide con el del HTML
    }
};
cambiarNombre();
