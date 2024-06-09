"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let url = "https://60aab45166f1d000177731ea.mockapi.io/api/usuarios";
  let ulLista = document.querySelector("#listaUsuarios");
  let input = document.querySelector("#number");
  let btnBorrar = document.querySelector("#btnBorrar");

  async function solicitarDatos() {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let json = await res.json();
        console.log(json);
        mostrarDatos(json);
      } else {
        console.log("Ha ocurrido un error..");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function mostrarDatos(json) {
    ulLista.innerHTML = "";
    json.forEach((e) => {
      let nuevoLi = document.createElement("li");
      nuevoLi.innerHTML = `id(${e.id}) ${e.nombre}`;
      ulLista.appendChild(nuevoLi);
    });
  }

  solicitarDatos();

  async function borrarDato(u) {
    try {
      let res = await fetch(`${url}/${u}`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Item eliminado!");
      }
    } catch (error) {
      console.log(error);
    }
    solicitarDatos();
  }

  btnBorrar.addEventListener("click", () => {
    let num = input.value;
    console.log(num);
    borrarDato(num);
  });
});
