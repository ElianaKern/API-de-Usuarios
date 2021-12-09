//Formulario Agregar usuario
const botonAgregarUsuario = document.querySelector('#boton-agregar-usuario');
const formulario = document.querySelector('#formulario');
const inputNombre = document.querySelector('#input-nombre');
const inputEmail = document.querySelector('#input-email');
const inputDireccion = document.querySelector('#input-direccion');
const inputTelefono = document.querySelector('#input-tel');
const botonEnviarUsuario = document.querySelector('#input-enviar');

// Formulario editar usuario
const formularioEditar = document.querySelector('#formulario-editar');
const inputEditarNombre = document.querySelector('#input-editar-nombre');
const inputEditarEmail = document.querySelector('#input-editar-email');
const inputEditarDireccion = document.querySelector('#input-editar-direccion');
const inputEditarTelefono = document.querySelector('#input-editar-tel');
const botonEnviarEdicion = document.querySelector('#enviar-edicion');

botonAgregarUsuario.onclick = () => {
  formulario.classList.toggle('ocultar');
};

const pedirInfoActualizada = () => {
  fetch('https://601da02bbe5f340017a19d60.mockapi.io/users')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      crearTablaHTML(data);
      editarUsuario();
      eliminarUsuario();
    });
};
pedirInfoActualizada();

const crearTablaHTML = (data) => {
  const tabla = document.querySelector('#tabla');
  const html = data.reduce(
    (acc, curr) => {
      return (
        acc +
        `  
    <tr>
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button id="${curr.id}" class="boton-editar"><i class="far fa-edit"></i></button>
      <button id="${curr.id}" class="boton-eliminar"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
    `
      );
    },
    `
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Direccion</th>
      <th>Telefono</th>
      <th>Acciones</th>
    </tr>
    `
  );

  tabla.innerHTML = html;
};

const agregarUsuarioNuevo = () => {
  fetch('https://601da02bbe5f340017a19d60.mockapi.io/users', {
    method: 'POST',
    body: JSON.stringify({
      address: inputDireccion.value,
      email: inputEmail.value,
      fullname: inputNombre.value,
      phone: inputTelefono.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      pedirInfoActualizada();
    });
};

botonEnviarUsuario.onclick = (e) => {
  e.preventDefault();
  agregarUsuarioNuevo();
  formulario.classList.add('ocultar');
};

const traerInfoDeUsuario = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      formularioEditar.classList.remove('ocultar');
      inputEditarNombre.value = data.fullname;
      inputEditarDireccion.value = data.address;
      inputEditarEmail.value = data.email;
      inputEditarTelefono.value = data.phone;
    });
};

const editarUsuario = () => {
  let botonesEditar = document.querySelectorAll('.boton-editar');
  console.log(botonesEditar);
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].onclick = () => {
      formularioEditar.classList.remove('ocultar');
      const id = botonesEditar[i].id;
      traerInfoDeUsuario(id);
      botonEnviarEdicion.onclick = (e) => {
        e.preventDefault();
        fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
            address: inputEditarDireccion.value,
            email: inputEditarEmail.value,
            fullname: inputEditarNombre.value,
            phone: inputEditarTelefono.value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            pedirInfoActualizada();
          });
        formularioEditar.classList.add('ocultar');
      };
    };
  }
};
// BOTON ELIMINAR
// Llamar a los botones desde JS con querySelectorAll
// Hacer un for que recorra el array de botones
// Adentro del for, hacer botones[i].onclick
// Guardar en una variable el ID del boton = botones[i].id
// Hacer un DELETE para borrar la info
// En la url del DELETE interpolar la variable ID
// Ejecutamos la funcion pedirInfoActualizada() (que es igual a hacer un GET)

const eliminarUsuario = () => {
  let botonesEliminar = document.querySelectorAll('.boton-eliminar');
  console.log(botonesEliminar);
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].onclick = () => {
      let idEliminar = botonesEliminar[i].id;
      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${idEliminar}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          pedirInfoActualizada();
        });
    };
  }
};
