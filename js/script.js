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
