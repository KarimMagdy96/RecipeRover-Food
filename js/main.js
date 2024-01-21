let searchQueries = Array.from(document.querySelectorAll(".searchQuerie"));
let titleHolder = document.getElementById("titleHolder");
let recipesTitle = Array.from(document.querySelectorAll(".recipesTitle"));
let recipesSourse = Array.from(document.querySelectorAll(".recipesSourse"));
let loadscreen = document.getElementById("loadscreen");
let bodyVisable = document.getElementById("bodyVisable");
let user = document.getElementById("user");
let mail = document.getElementById("mail");
let loginDoor = document.getElementById("loginDoor");
let close = document.getElementById("close");
let userIcon = document.getElementById("userIcon");
let mailLabel = document.getElementById("mailLabel");
let modalbackdrop = document.querySelector(".modal-backdrop");
let password = document.getElementById("password");
let staticBackdrop = document.getElementById("staticBackdrop");
let signBtn = document.getElementById("signBtn");
let signUp = document.getElementById("signUp");
const usernameRegex = /^(user|[\w-]{3,16})$/;
const emailRegex = /^(e@mail\.com|[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(1234|\d{8,12})$/;
let alreadyUser = document.getElementById("alreadyUser");
let recipesDetailsBtn = Array.from(
  document.querySelectorAll(".recipesDetailsBtn")
);

let searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);
let recipesImg = Array.from(document.querySelectorAll(".recipesImg"));
let Recipeslist;
var loginform;
// *******************************************************************************
// start whe site loads
start("pizza");

// add click event
for (let i = 0; i < searchQueries.length; i++) {
  searchQueries[i].addEventListener("click", function (e) {
    titleHolder.innerHTML = e.target.innerHTML;
    getRecipes(e.target.innerHTML);
  });
}
// add click event
for (let r = 0; r < searchQuerieCard.length; r++) {
  searchQuerieCard[r].addEventListener("click", function (e) {
    if (e.target.closest("div").innerText != null) {
      start(e.target.closest("div").innerText);
      titleHolder.innerHTML = e.target.closest("div").innerText;
    }
  });
}
// start all
async function start(category) {
  await getRecipes(category);
  displayRecipes(Recipeslist);
  console.log("finised");
}

// get all recipes
async function getRecipes(category) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${category}`
  );
  let Recipes = await response.json();
  Recipeslist = Recipes.recipes;
  fullyload();
}

// display recipes
function displayRecipes(Recipes) {
  for (let i = 0; i < Recipes.length; i++) {
    recipesImg[i].src = Recipes[i].image_url;
    recipesTitle[i].innerHTML = Recipes[i].title;
    recipesImg[i].alt = Recipes[i].title;
    recipesSourse[i].href = Recipes[i].source_url;
  }
}

function fullyload() {
  loadscreen.classList.add("d-none");
  bodyVisable.classList.remove("overflow-hidden");
}

// sign up

let RegisteredUserData = [];

if (localStorage.getItem("userData") == null) {
  RegisteredUserData = [];
} else {
  RegisteredUserData = JSON.parse(localStorage.getItem("userData"));
}

signBtn.addEventListener("click", function () {
  if (
    user.value != "" &&
    mail.value != "" &&
    password.value != "" &&
    user.classList.contains("is-valid") &&
    mail.classList.contains("is-valid") &&
    password.classList.contains("is-valid")
  ) {
    signUser();
    displayUserData();
    loginform = true;
  } else if (
    user.value != "" &&
    password.value != "" &&
    signBtn.innerHTML == `LOGIN` &&
    mail.classList.contains("d-none") &&
    RegisteredUserData != null
  ) {
    loginguser();
  }
});
//user validation
user.addEventListener("keyup", function () {
  if (usernameRegex.test(user.value)) {
    user.classList.remove("is-invalid");
    user.classList.add("is-valid");
  } else {
    user.classList.remove("is-valid");
    user.classList.add("is-invalid");
  }
});
//mail validation
mail.addEventListener("keyup", function () {
  if (emailRegex.test(mail.value)) {
    mail.classList.remove("is-invalid");
    mail.classList.add("is-valid");
  } else {
    mail.classList.remove("is-valid");
    mail.classList.add("is-invalid");
  }
});
// password validation
password.addEventListener("keyup", function () {
  if (passwordRegex.test(password.value)) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  } else {
    password.classList.remove("is-valid");
    password.classList.add("is-invalid");
  }
});

//  sign up
function signUser() {
  if (signBtn.innerText == `REGISTER`) {
    userData = {
      user: user.value,
      mail: mail.value,
      password: password.value,
    };
    RegisteredUserData.push(userData);
    localStorage.setItem("userData", JSON.stringify(RegisteredUserData));
  }
}
// login display
function displayUserData() {
  signBtn.innerHTML = `LOGIN`;
  mail.classList.add("d-none");
  alreadyUser.innerHTML = `Don't have account?  <button   id="signUp" class="text-decoration-none ms-2 bg-transparent border-0 fw-bold text-danger">Sign Up</button>`;
  mailLabel.classList.add("d-none");
  signBtn.classList.add("btn-outline-success");
  signBtn.classList.remove("btn-outline-danger");
  restFormValues();
}

//rest fORM FOR LOGIN
alreadyUser.addEventListener("click", function () {
  alreadyRegistered();
});

//rest fORM FOR LOGIN
function alreadyRegistered() {
  signBtn.innerHTML = `REGISTER`;
  mail.classList.toggle("d-none");
  mailLabel.classList.toggle("d-none");
  signBtn.classList.toggle("btn-outline-success");
  signBtn.classList.toggle("btn-outline-danger");
  if (signBtn.classList.contains("btn-outline-success")) {
    signBtn.innerHTML = `LOGIN`;
    alreadyUser.innerHTML = `Don't have account?  <button   id="signUp" class="text-decoration-none ms-2 bg-transparent border-0 fw-bold text-danger">Sign Up</button>`;
    restFormValues();
  } else {
    alreadyUser.innerHTML = `Already have accounte?  <button   id="signUp" class="text-decoration-none ms-2 bg-transparent border-0 fw-bold text-danger">Login</button>`;
    restFormValues();
  }
  if (signBtn.classList.contains("btn-outline-success")) {
    loginform = true;
  } else if (signBtn.classList.contains("btn-outline-danger")) {
    loginform = false;
  }
}
//rest form values
function restFormValues() {
  user.value = "";
  mail.value = "";
  password.value = "";
  user.classList.remove("is-valid");
  password.classList.remove("is-valid");
  mail.classList.remove("is-valid");
}

function loginguser() {
  for (let i = 0; i < RegisteredUserData.length; i++) {
    if (
      RegisteredUserData[i].user == user.value &&
      RegisteredUserData[i].password == password.value
    ) {
      userIcon.innerHTML = RegisteredUserData[i].user.charAt(0);
      userIcon.classList.add("Logged");
      restFormValues();
      loginform = true;
      alreadyRegistered();
    }
  }
}

function closeModal() {
  signBtn.setAttribute("data-bs-dismiss", "modal");
  signBtn.setAttribute("aria-label", "Close");
}

function closelogin() {
  if (
    loginform &&
    password.classList.contains("is-valid") &&
    user.classList.contains("is-valid") &&
    signBtn.classList.contains("btn-outline-success")
  ) {
    closeModal();
  }
}
user.addEventListener("keyup", closelogin);
password.addEventListener("keyup", closelogin);

function openmodel() {
  signBtn.removeAttribute("data-bs-dismiss");
  signBtn.removeAttribute("aria-label");
}
