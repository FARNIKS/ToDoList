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

    // Capturamos cada valor en su respectiva variable
    const titulo = document.getElementById("title-todo").value;
    const descripcion = document.getElementById("description-todo").value;
    const fechaLimite = document.getElementById("fecha").value;
    const importancia = document.getElementById("importance").value;
    const dificultad = document.getElementById("difficulty").value;
    let errors = "";

    if (titulo === "") {
      errors += "Debes ingresar in titulo\n";
    }

    if (descripcion.length > 100) {
      errors += "La descripcion es mayor a 100 caracteres\n";
    }

    if (errors !== "") {
      alert(errors);
      return;
    }

    // Aquí ya tienes todo validado
    console.log(errors);
    console.log("Título:", titulo);
    console.log("Descripción:", descripcion);
    console.log("Fecha límite:", fechaFormateada);
    console.log("Importancia:", importancia);
    console.log("Dificultad:", dificultad);
  });
