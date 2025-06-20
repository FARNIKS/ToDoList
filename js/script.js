const menu = document.getElementById("hamburguer");
const links = document.getElementById("nav-links-mobile");
const navBar = document.getElementById("nav-bar");
const navLinks = document.getElementById("nav-links");

navLinks.setAttribute("style", "display: none");

menu.addEventListener("click", (e) => {
  if (links.getAttribute("style") === "display: none") {
    links.setAttribute("style", "display: flex; ");
    navLinks.setAttribute("style", "display: none;");
    console.log("links si");
  } else {
    links.setAttribute("style", "display: none");
    navLinks.setAttribute("style", "display: flex; ");
    console.log("links no");
  }
});

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const titulo = document.getElementById("title-todo").value;
    const descripcion = document.getElementById("description-todo").value;
    const inputFecha = document.getElementById("fecha").value;
    const importanciaSelect = document.getElementById("importance");
    const dificultadSelect = document.getElementById("difficulty");

    const importanciaTexto =
      importanciaSelect.options[importanciaSelect.selectedIndex].text;
    const dificultadTexto =
      dificultadSelect.options[dificultadSelect.selectedIndex].text;

    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");

    const fechaMinima = `${año}-${mes}-${dia}`;

    inputFecha.min = fechaMinima;

    let errors = "";

    if (inputFecha !== "" && inputFecha < fechaMinima) {
      errors += "La fecha no puede ser inferior a la actual\n";
    }

    console.log("Título:", titulo);
    console.log("Descripción:", descripcion);
    console.log("Fecha límite:", inputFecha);
    console.log("Importancia:", importanciaTexto);
    console.log("Dificultad:", dificultadTexto);
  });
