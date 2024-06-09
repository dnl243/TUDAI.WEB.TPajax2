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

async function solicitarDatos() {
  try {
    let res = await fetch(url);
    if (res.ok) {
      let json = await res.json();
      console.log(json);
      mostrarLista(json);
    } else {
      console.log("Ha ocurrido un error..");
    }
  } catch (error) {
    console.log(error);
  }
}

function mostrarLista(json) {
  ulLista.innerHTML = "";
  json.forEach((e) => {
    let nuevoLi = document.createElement("li");
    nuevoLi.innerHTML = `id(${e.id}) ${e.nombre}`;
    ulLista.appendChild(nuevoLi);
  });
}

solicitarDatos();

async function enviarDatos(u) {
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(u),
    });
    if (res.ok) {
      let json = await res.json();
      console.log(json);
      console.log("Creado!");
      solicitarDatos();
    }
  } catch (error) {
    console.log(error);
  }
}

function enviarForm(e) {
  e.preventDefault();
  let formData = new FormData(form);
  let nombre = formData.get("nombre");
  let numero = Number(formData.get("numero"));
  let usuario = {
    nombre: nombre,
    numero: numero,
  };
  console.log(usuario);
  enviarDatos(usuario);
  nombreEnviado.innerHTML = usuario.nombre;
  numeroEnviado.innerHTML = usuario.numero;
  jsonEnviado.innerHTML = JSON.stringify(usuario);
  urlDestino.innerHTML = url;
}

let form = document.querySelector("#formUsuario");
form.addEventListener("submit", (e) => {
  enviarForm(e);
});
