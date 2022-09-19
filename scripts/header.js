let hamburger = document.querySelector("#hamburger");
let navMenu = document.querySelector("#nav-menu");
let body = document.querySelector("body");

hamburger.addEventListener("click", function() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
  body.classList.toggle("active");
});