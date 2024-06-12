"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://6665bc91d122c2868e419690.mockapi.io/api/alumnos";
  const form = document.querySelector("#formAlumnos");
  form.addEventListener("submit", (e) => cargarAlumno(e));
  const formBorrar = document.querySelector("#borrarAlumno");
  formBorrar.addEventListener("submit", (e) => borrarAlumno(e));
  let parciales = [];
  let idAlumnos = [];

  function setearParciales() {
    parciales = [
      {
        aprobados: 0,
        desaprobados: 0,
        porcAprob: 0,
        promedio: 0,
      },
      {
        aprobados: 0,
        desaprobados: 0,
        porcAprob: 0,
        promedio: 0,
      },
      {
        aprobados: 0,
        desaprobados: 0,
        porcAprob: 0,
        promedio: 0,
      },
    ];
  }

  function obtenerEstadistica(datos, parcial, i) {
    datos.forEach((e) => {
      e[parcial] >= 4 ? parciales[i].aprobados++ : parciales[i].desaprobados++;
    });
    parciales[i].porcAprob = Number(
      ((100 * parciales[i].aprobados) / datos.length).toFixed(2)
    );
  }

  function obtenerPromedio(datos, parcial, i) {
    let promedio = 0;
    datos.forEach((e) => {
      let nota = e[parcial];
      promedio += nota;
    });
    promedio /= datos.length;
    parciales[i].promedio = promedio.toFixed(1);
  }

  function imprimirEstadistica(i, id) {
    //capturo tr
    let trParcial = document.querySelector(id);
    trParcial.innerHTML = "";
    //nro de parcial
    let nParcial = document.createElement("td");
    nParcial.innerHTML = i + 1;
    trParcial.appendChild(nParcial);
    //cant aprobados
    let aprob = document.createElement("td");
    aprob.innerHTML = parciales[i].aprobados;
    trParcial.appendChild(aprob);
    //cant desaprobados
    let desap = document.createElement("td");
    desap.innerHTML = parciales[i].desaprobados;
    trParcial.appendChild(desap);
    //porcentaje aprobación
    let porcAprob = document.createElement("td");
    porcAprob.innerHTML = parciales[i].porcAprob;
    trParcial.appendChild(porcAprob);
    //promedio notas por parcial
    let prom = document.createElement("td");
    prom.innerHTML = parciales[i].promedio;
    trParcial.appendChild(prom);
  }

  function imprimirTabla(datos) {
    let tbodyDatos = document.querySelector("#datosTabla");
    tbodyDatos.innerHTML = "";
    datos.forEach((e) => {
      //nuevo tr por alumno
      let nuevoTr = document.createElement("tr");
      //apellido
      let tdApellido = document.createElement("td");
      tdApellido.innerHTML = e.apellido;
      nuevoTr.appendChild(tdApellido);
      //nombre
      let tdNombre = document.createElement("td");
      tdNombre.innerHTML = e.nombre;
      nuevoTr.appendChild(tdNombre);
      //dni
      let tdDni = document.createElement("td");
      tdDni.innerHTML = e.dni;
      nuevoTr.appendChild(tdDni);
      //parcial1
      let tdParcial1 = document.createElement("td");
      e.parcial1 == 0
        ? (tdParcial1.innerHTML = "-")
        : (tdParcial1.innerHTML = e.parcial1);
      nuevoTr.appendChild(tdParcial1);
      //parcial2
      let tdParcial2 = document.createElement("td");
      e.parcial2 == 0
        ? (tdParcial2.innerHTML = "-")
        : (tdParcial2.innerHTML = e.parcial2);
      nuevoTr.appendChild(tdParcial2);
      //parcial3
      let tdParcial3 = document.createElement("td");
      e.parcial3 == 0
        ? (tdParcial3.innerHTML = "-")
        : (tdParcial3.innerHTML = e.parcial3);
      nuevoTr.appendChild(tdParcial3);
      //promedio
      let tdPromedio = document.createElement("td");
      let parciales = [];
      if (e.parcial1 != 0) parciales.push(e.parcial1);
      if (e.parcial2 != 0) parciales.push(e.parcial2);
      if (e.parcial3 != 0) parciales.push(e.parcial3);
      let sumatoria = 0;
      parciales.forEach((e) => {
        sumatoria += e;
      });
      let prom = sumatoria / parciales.length;
      tdPromedio.innerHTML = prom.toFixed(1);
      nuevoTr.appendChild(tdPromedio);
      //inserto el tr en el cuerpo de la tabla
      tbodyDatos.appendChild(nuevoTr);
    });
  }

  function imprimirLista(datos) {
    const ulAlumnos = document.querySelector("#ulAlumnos");
    ulAlumnos.innerHTML = "";
    let listaOrdenada = [];
    datos.forEach((e) => {
      listaOrdenada.unshift(`${e.apellido} ${e.nombre}`);
    });
    listaOrdenada.sort();
    listaOrdenada.forEach((e) => {
      let nuevoLi = document.createElement("li");
      nuevoLi.innerHTML = e;
      ulAlumnos.appendChild(nuevoLi);
    });
  }

  function obtenerIdAlumnos(datos) {
    datos.forEach((e) => {
      let alumno = { nombre: `${e.nombre} ${e.apellido}`, id: e.id };
      idAlumnos.push(alumno);
    });
  }

  function refrescar(datos) {
    setearParciales();
    obtenerEstadistica(datos, "parcial1", 0);
    obtenerEstadistica(datos, "parcial2", 1);
    obtenerEstadistica(datos, "parcial3", 2);
    obtenerPromedio(datos, "parcial1", 0);
    obtenerPromedio(datos, "parcial2", 1);
    obtenerPromedio(datos, "parcial3", 2);
    imprimirEstadistica(0, "#parcial1");
    imprimirEstadistica(1, "#parcial2");
    imprimirEstadistica(2, "#parcial3");
    imprimirTabla(datos);
    imprimirLista(datos);
    obtenerIdAlumnos(datos);
  }

  async function solicitarDatos() {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let json = await res.json();
        refrescar(json);
      } else {
        alert("Ha ocurrido un error en la solicitud de datos a la db!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function enviarDatos(a) {
    try {
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(a),
      });
      if (res.ok) {
        let json = await res.json();
        solicitarDatos();
      } else {
        alert("Ha ocurrido un error en el envio de datos a la db!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function cargarAlumno(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let dni = Number(formData.get("dni"));
    if (nombre === "" || apellido === "" || dni === 0) {
      alert("Los campos Nombre, Apellido y DNI son obligatorios");
    } else {
      let alumno = {
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        parcial1: Number(formData.get("1erParcial")),
        parcial2: Number(formData.get("2doParcial")),
        parcial3: Number(formData.get("3erParcial")),
      };
      form.reset();
      document.querySelector("#nombre").focus();
      console.log(alumno);
      enviarDatos(alumno);
    }
  }

  solicitarDatos();

  async function borrarDatos(id) {
    try {
      let res = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Alumno borrado del registro!");
        location.reload();
      } else {
        alert("Ha ocurrido un error!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function borrarAlumno(e) {
    e.preventDefault();
    const nombreComp = formBorrar.elements["nombreComp"].value;
    const indexAlumno = idAlumnos.findIndex(
      (alumno) => alumno.nombre === nombreComp
    );
    if (indexAlumno !== -1) {
      const id = idAlumnos[indexAlumno].id;
      borrarDatos(id);
    } else {
      alert("El alumno no se encuentra registrado");
      formBorrar.reset();
      document.querySelector("#nombreComp").focus();
    }
  }
});
