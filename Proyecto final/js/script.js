window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM cargando...")
  let botonEnviar = document.getElementById("btn-Send");
  botonEnviar.addEventListener("click", async (e) => {
    e.preventDefault()
    try {

      //recuperar los valores del formulario

      let nombre = document.getElementById("nombre").value;
      let email = document.getElementById("correo").value;
      let telefono = document.getElementById("telefono").value;
      let contacto = getContacto();
      let Problema = getProblema();
      let FormularioPro = {
        nombre,
        email,
        telefono,
        contacto,
        Problema
      };

      const url = "https://learningfirebase-fcaed-default-rtdb.firebaseio.com/suscriptores.json";
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(FormularioPro)
            });
            if( !respuesta.ok ) {
                throw new Error("Error en la respuesta. Código: "+respuesta.status);
            }
            const data = await respuesta.json();
            mostrarExito(`Se ha guardado su formulario con ID: ${data.nombre}`)
        } catch( e ) {
            mostrarError(e.message);
        }
        return false;
    });    
});
function getContacto() {
  const arr = document.querySelectorAll("input[type='checkbox'][name='Contacto']:checked");
  let Contacto = [];
  arr.forEach( i => Contacto.push(i.value));
  if(arr.length == 0) {
      throw new Error("Debe seleccionar al menos un tipo de contacto");
  }
  return Contacto;
}

function getProblema() {
  const arr = document.querySelectorAll("input[type='radio'][name='Problema']:checked");
  if(arr.length == 0) {
      throw new Error("Debe seleccionar un problema ");        
  }
  return arr[0].value;
}

function mostrarMensaje(idContenedor, mensaje) {
  const ul = document.querySelector(`#${idContenedor} ul`);
  const li = document.createElement("li")
  const liContent = document.createTextNode( mensaje )
  li.appendChild( liContent )
  ul.appendChild(li);
}

function displayMensajeExito(b) {
  const idExito = "form-formulario-exito";
  const idError = "form-formulario-error";
  
  if( b ) {        
      document.getElementById(idExito).style.display = "block";
      document.getElementById(idError).style.display = "none";
  } else {
      document.getElementById(idExito).style.display = "none";
      document.getElementById(idError).style.display = "block";
  }
}
function mostrarExito(mensaje) {
  const idExito = "form-formulario-exito";
  displayMensajeExito(true);
  mostrarMensaje(idExito, mensaje);
}
function mostrarError(mensaje) {
  const idError = "form-formulario-error";
  displayMensajeExito(false);
  mostrarMensaje(idError, mensaje);
}


console.log("Holaa wooorld")
