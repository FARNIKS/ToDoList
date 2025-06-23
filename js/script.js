const menu = document.getElementById("hamburguer");
const links = document.getElementById("nav-links-mobile");
const navBar = document.getElementById("nav-bar");
const navLinks = document.getElementById("nav-links");

const formTask = document.getElementById("task-form");

navLinks.setAttribute("style", "display: none");

const showSideBar = () => {
  if (links.getAttribute("style") === "display: none") {
    links.setAttribute("style", "display: flex; ");
    navLinks.setAttribute("style", "display: none;");
    console.log("links si");
  } else {
    links.setAttribute("style", "display: none");
    navLinks.setAttribute("style", "display: flex; ");
    console.log("links no");
  }
};

menu.addEventListener("click", (e) => {
  showSideBar();
});

document
  .getElementById("task-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita recargar la página

    const {
      titleTodo,
      descriptionTodo,
      date,
      selectedLevelImportance,
      selectedLevelDificulty,
    } = formTask.elements;

    const taskDetails = {
      title: titleTodo.value,
      description: descriptionTodo.value || "Sin description",
      date: date.value,
      importance: selectedLevelImportance.value,
      dificulty: selectedLevelDificulty.value,
    };

    createCardTodo(taskDetails);

    saveCardTodo();
  });

const createCardTodo = ({
  title,
  description,
  date,
  importance,
  dificulty,
}) => {
  const todoAdd = document.createElement("div");
  const taskList = document.querySelector("#task-list");

  todoAdd.innerHTML = `<div class = "check-list-todo">
  <input type="checkbox"> 
  <h3>${title}</h3> 
  </div>
    <p>Descripcion: ${description}</p> 
    <p>Fecha: ${date}</p> 
    <p>Importancia: ${importance}</p> 
    <p>Dificultad: ${dificulty}</p>
    <button class="buttons">Eliminar tarea</button>`;

  taskList.appendChild(todoAdd);
  todoAdd.setAttribute("class", "task-todo");
};

function name(params) {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");

  const fechaMinima = `${año}-${mes}-${dia}`;

  inputFecha.min = fechaMinima;
}
