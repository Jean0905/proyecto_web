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
        console.log(localStorage.getItem('usuarios')); // Verifica que los datos se guardaron correctamente
    } catch (error) {
        console.error('Error al obtener los datos: ', error);
    }
};
datos();

const ingresar = () => {
    const id = document.getElementById('usuario').value.trim();
    const contra = document.getElementById('contraseña').value.trim(); 

    dato = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(dato); // Verifica los datos obtenidos

    const user = dato.find(user => user.Usuarioni === id && user.contraseñani === contra);

    if (user) {
        alert(`¡Bienvenido, ${user.nombre}!`);

        localStorage.setItem('loged', 'true');
        localStorage.setItem('llaveName', user.nombre); // Guardar el nombre sin JSON.stringify

        console.log(localStorage.getItem('llaveName')); // Verifica que el nombre se guardó

        if (user.tipo === 'admin') {
            window.location.href = '../html/admin.html';
        } else {
            window.location.href = '../html/usuario.html';
        }
    } else {
        alert('Usuario no encontrado');
    }
}

const extraerNombres = () => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(usuarios); // Verifica que los datos se obtienen correctamente

    const nombres = usuarios.map(user => user.nombre);
    console.log(nombres); // Verifica los nombres extraídos
};

extraerNombres();
