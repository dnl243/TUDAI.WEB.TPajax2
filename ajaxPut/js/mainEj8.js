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

let ulLista = document.querySelector("#listaUsuarios");
let url = "https://60aab45166f1d000177731ea.mockapi.io/api/usuarios";
let nombreEnviado = document.querySelector("#nombreEnviado");
let numeroEnviado = document.querySelector("#numeroEnviado");
let jsonEnviado = document.querySelector("#jsonEnviado");
let urlDestino = document.querySelector("#urlDestino");
let idModificado = document.querySelector("#id");

async function mostrarLista() {
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

mostrarLista();

async function enviarDatos(u, id) {
  try {
    let res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "aplication/json",
      },
      body: JSON.stringify(u),
    });
    if (res.ok) {
      console.log("Modificado!");
      mostrarLista();
    }
  } catch (error) {
    console.log(error);
  }
}

function enviarForm(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let id = Number(formData.get("id"));
  let nombre = formData.get("nombre");
  let numero = Number(formData.get("numero"));
  let usuario = {
    nombre: nombre,
    numero: numero,
  };
  enviarDatos(usuario, id);
  nombreEnviado.innerHTML = usuario.nombre;
  numeroEnviado.innerHTML = usuario.numero;
  idModificado.innerHTML = id;
  urlDestino.innerHTML = url;
}

let form = document.querySelector("#formUsuario");
form.addEventListener("submit", (e) => {
  enviarForm(e);
});
