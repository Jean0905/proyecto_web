window.onload = () => {
    const botonIngresar = document.getElementById('ingresa');
    botonIngresar.addEventListener('click', ingresar); 
}

let dato = [];
const datos = async () => {
    try {
        const consulta = await fetch('https://api.jsonbin.io/v3/b/66fdf7f4ad19ca34f8b1cb66');
        const datos = await consulta.json();
        localStorage.setItem('usuarios', JSON.stringify(datos.record));
        console.log('Datos guardados en localStorage');
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
    }
};
datos();

const ingresar = () => {
    const id = document.getElementById('usuario').value.trim();
    const contra = document.getElementById('contraseña').value.trim(); 

    dato = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Asegúrate de que los nombres de las claves sean correctos
    const users = dato.find(user => user.Usuarioni === id && user.contraseñani === contra);

    if (users) {
        alert(`¡Bienvenido, ${users.nombre}!`);
        if (users.tipo === 'admin') {
            window.location.href = '../html/admin.html';
        } else {
            window.location.href = '../html/usuario.html';
        }
    } else {
        alert('Usuario no encontrado');
    }
}