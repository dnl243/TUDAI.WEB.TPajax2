"use stric";

document.addEventListener("DOMContentLoaded", () => {
  //API de clima OpenWeather
  const endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ciudad = "Tandil,Argentina";
  const apiKey = "fa8f24adec524606d87639c08ca2f768";
  const url = `${endPoint}${ciudad}&appid=${apiKey}&lang=es`;
  //nodos
  const fecha = document.querySelector("#fecha");
  const temp = document.querySelector("#temp");
  const hum = document.querySelector("#hum");
  const pres = document.querySelector("#pres");
  const img = document.querySelector("#img");
  const desc = document.querySelector("#desc");
  const st = document.querySelector("#st");
  const viento = document.querySelector("#viento");
  const direccion = document.querySelector("#direccion");
  const rafagas = document.querySelector("#rafagas");
  const visibilidad = document.querySelector("#visibilidad");
  const salida = document.querySelector("#salida");
  const puesta = document.querySelector("#puesta");
  //fecha/dia
  const dia = new Date();
  const diaSem = dia.getDay(); // 0-6
  const diaMes = dia.getDate(); // fecha nro
  const mes = dia.getMonth(); // 0-12
  const anio = dia.getFullYear(); // año
  const fechaCompleta = `${nombreDia(diaSem)} ${diaMes} de ${nombreMes(mes)} de ${anio}`;
  fecha.innerHTML = fechaCompleta;
  function nombreDia(d) {
    switch (d) {
      case 0:
        return "Domingo";
      case 1:
        return "Lunes";
      case 2:
        return "Martes";
      case 3:
        return "Miercoles";
      case 4:
        return "Jueves";
      case 5:
        return "Viernes";
      case 6:
        return "Sabado";
    }
  }
  function nombreMes(a) {
    switch (a) {
      case 0:
        return "Enero";
      case 1:
        return "Febrero";
      case 2:
        return "Marzo";
      case 3:
        return "Abril";
      case 4:
        return "Mayo";
      case 5:
        return "Junio";
      case 6:
        return "Julio";
      case 7:
        return "Agosto";
      case 8:
        return "Septiembre";
      case 9:
        return "Octubre";
      case 10:
        return "Noviembre";
      case 11:
        return "Diciembre";
    }
  }
  //dirección del viento
  function dirViento(d) {
    switch (true) {
      case d < 23:
        return "Norte";
      case d < 68:
        return "Noreste";
      case d < 113:
        return "Este";
      case d < 158:
        return "Sudeste";
      case d < 203:
        return "Sur";
      case d < 248:
        return "Sudoeste";
      case d < 293:
        return "Oeste";
      case d < 338:
        return "Noroeste";
      default:
        return "Norte";
    }
  }
  //configuracion hora
  function horaConf(h) {
    let date = new Date(h * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = hours + ":" + minutes;
    return time;
  }
  //mosrtar datos
  function mostrarDatos(json) {
    temp.innerHTML = (json.main.temp - 273.15).toFixed(1);
    hum.innerHTML = json.main.humidity;
    pres.innerHTML = json.main.pressure * 0.1;
    let codIcon = json.weather[0].icon;
    //selección icono clima
    img.setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + codIcon + "@2x.png"
    );
    desc.innerHTML = json.weather[0].description.toUpperCase();
    st.innerHTML = (json.main.feels_like - 273.15).toFixed(1);
    viento.innerHTML = (json.wind.speed * 3.6).toFixed(1);
    direccion.innerHTML = dirViento(json.wind.deg);
    rafagas.innerHTML = (json.wind.gust * 3.6).toFixed(1);
    visibilidad.innerHTML = (json.visibility / 1000).toFixed(1);
    salida.innerHTML = horaConf(json.sys.sunrise);
    puesta.innerHTML = horaConf(json.sys.sunset);
  }
  // solicitud de datos
  async function solicitarDatos() {
    try {
      let res = await fetch(url);
      if (res.ok) {
        let json = await res.json();
        console.log(json);
        mostrarDatos(json);
      } else {
        alert("ha ocurrido un error en la respuesta");
      }
    } catch (error) {
      console.log(error);
    }
  }
  solicitarDatos();
});
