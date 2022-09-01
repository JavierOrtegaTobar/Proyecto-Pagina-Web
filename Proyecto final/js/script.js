//alert("Hola mundo!!!");

//este es un comentario js//

/* comentario en parrafo
 
 
*/

window.addEventListener("DOMContentLoaded", (e) => {
  // con el evenbto DOMCcontentLoaded me aseguro que todas las etiquetas html
  //fueron cargadas y procesadas en el navegador (carga dandole prioridad a html)
  //en vez de imagenes y frames.
  console.log("evento DomContentLoaded")

  //sintaxis
  // ejemplo: let nombreVariable = valor
  // ej: let nombre = "santiago"
  // ej: let edad = 34;

  let boton = document.getElementById("btn-suscribir");
  boton.addEventListener("click", (ev) => {
    try {

      //recuperar los valores del formulario

      let nombre = document.getElementById("nombre").value;
      let email = document.getElementById("correo").value;
      if (nombre.length < 5) {
        throw new Error("El nombre es demasiado corto");

      }

      let intereses = getIntereses();
      let genero = getGenero();
      let suscriptor = {

        nombre,
        email,
        genero,
        fecha_registro: (new Date()).toISOString()

      };

      console.dir(suscriptor);
      guardarSuscriptor(suscriptor);

    } catch (e) {
      mostrarError(e.message)
    }

  });


});

function guardarSuscriptor(suscriptor) {
  const url = "https://cursofrontend-6d8fc-default-rtdb.firebaseio.com/suscriptores.json";
  fetch(url, {
    method: "POST",
    body: JSON.stringify(suscriptor)

  });

    .then(respuesta => respuesta.json())
    .then(data => mostrarExito("Se guardo correctamente su suscripcion"))
  ;
}

function getIntereses() {
  let inputIntereses = document.querySelectorAll("input[name='intereses']:checked");
  let arrIntereses = [];
  inputIntereses.forEach(nodoInteres => arrIntereses.push(nodoInteres.value));

  if (inputIntereses.length < 1) {
    throw new Error("Debe seleccionar al menos 1 tema de su interes")
  }

  return arrIntereses;
}


function getGenero() {
  let inputSeleccionado = document.querySelector("input[name='genero']:checked");
  if (inputSeleccionado == null) {

    throw new Error("Debe seleccionar un genero!");
  }
  const genero = inputSeleccionado.value;
  return genero;
}



function mostrarError(mensajeDeError) {
  document.getElementById("form-mensaje-error").style.display = "block";
  const ul = document.querySelector("#form-mensaje-error ul");
  const li = document.createElement("li");
  const liText = document.createTextNode(mensajeDeError);
  li.appendChild(liText);
  ul.appendChild(li);
}


console.log("Holaa wooorld")
