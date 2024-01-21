var searchQueries = Array.from(document.querySelectorAll(".searchQuerie"));
var titleHolder = document.getElementById("titleHolder");
var recipesTitle = Array.from(document.querySelectorAll(".recipesTitle"));
var recipesSourse = Array.from(document.querySelectorAll(".recipesSourse"));
var loadscreen = document.getElementById("loadscreen");
var bodyVisable = document.getElementById("bodyVisable");
var user = document.getElementById("user");
var mail = document.getElementById("mail");
var loginDoor = document.getElementById("loginDoor");
var userIcon = document.getElementById("userIcon");
var mailLabel = document.getElementById("mailLabel");
var password = document.getElementById("password");
var signBtn = document.getElementById("signBtn");
var signUp = document.getElementById("signUp");
const usernameRegex = /^(user|[\w-]{3,16})$/;
const emailRegex = /^(e@mail\.com|[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(1234|\d{8,12})$/;
var alreadyUser = document.getElementById("alreadyUser");
var recipesDetailsBtn = Array.from(
  document.querySelectorAll(".recipesDetailsBtn")
);
var searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);
var searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);
var recipesImg = Array.from(document.querySelectorAll(".recipesImg"));
var Recipeslist;

// *******************************************************************************
// start whe site loads
start("pizza");

// add click event
for (var i = 0; i < searchQueries.length; i++) {
  searchQueries[i].addEventListener("click", function (e) {
    titleHolder.innerHTML = e.target.innerHTML;
    getRecipes(e.target.innerHTML);
  });
}
// add click event
for (var r = 0; r < searchQuerieCard.length; r++) {
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
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${category}`
  );
  var Recipes = await response.json();
  Recipeslist = Recipes.recipes;
  fullyload();
}

// display recipes
function displayRecipes(Recipes) {
  for (var i = 0; i < Recipes.length; i++) {
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
var RegisteredUserData = [];

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
    localStorage.setItem("userData", JSON.stringify(userData));
    RegisteredUserData.push(JSON.parse(localStorage.getItem("userData")));
  }
}
// login display
function displayUserData() {
  signBtn.innerHTML = `SIGN IN`;
  mail.classList.add("d-none");
  alreadyUser.innerHTML = `Don't have account?  <button   id="signUp" class="text-decoration-none ms-2 bg-transparent border-0 fw-bold text-danger">Sign Up</button>`;
  mailLabel.classList.add("d-none");
  signBtn.classList.add("btn-outline-success");
  signBtn.classList.remove("btn-outline-danger");
  for (var i = 0; i < RegisteredUserData.length; i++) {
    if (
      RegisteredUserData[i].user == user.value &&
      RegisteredUserData[i].password == password.value
    ) {
      userIcon.innerHTML = RegisteredUserData[i].user.charAt(0);
      userIcon.classList.add("Logged");
    }
  }
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
    alreadyUser.innerHTML = `Already have account?  <button   id="signUp" class="text-decoration-none ms-2 bg-transparent border-0 fw-bold text-danger">Sign In</button>`;
    restFormValues();
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
