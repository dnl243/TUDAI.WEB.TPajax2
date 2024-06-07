/* FORMATOS DE RESPUESTA
let response = await respons.text() // para texto
let response = await respons.blob() // para media: img,audio,video
let response = await respons.json() // para datos
*/
//  REST utiliza el protocolo HTTP

//  Métodos del protocolo http
//POST: crear un recurso
//GET: obtener uno o más recursos
//PUT: actualizar uno o más recursos
//DELETE: borrar un recurso

"use strict";

async function solicitarDatos() {
  let url = "https://60aab45166f1d000177731ea.mockapi.io/api/usuarios";
  let ulLista = document.querySelector("#listaUsuarios");
  ulLista.innerHTML = "";
  try {
    let res = await fetch(url);
    if (res.ok) {
      let json = await res.json();
      console.table(json);
      json.forEach((e) => {
        let nuevoLi = document.createElement("li");
        nuevoLi.innerHTML = `id(${e.id}) ${e.nombre}`;
        ulLista.appendChild(nuevoLi);
      });
    } else {
      console.log("Ha ocurrido un error..");
    }
  } catch (error) {
    console.log(error);
  }
}

solicitarDatos();
