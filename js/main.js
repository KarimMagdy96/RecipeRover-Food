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
let recipesMenu = document.getElementById("recipesMenu");
let userIcon = document.getElementById("userIcon");
let massage = document.getElementById("massage");
let detailsDialoge = document.getElementById("detailsDialoge");
let mailLabel = document.getElementById("mailLabel");
let modalbackdrop = document.querySelector(".modal-backdrop");
let password = document.getElementById("password");
let details = Array.from(document.getElementsByClassName("details"));
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
  let cols = ``;

  for (let i = 0; i < Recipes.length; i++) {
    cols += `
    <div class="col">
    <div class="card h-100 border-0 shadow rounded-4 border-0">
      <div
        class="popCardImg bg-danger-subtle p-2 d-flex justify-content-center align-items-center rounded-4"
      >
        <img
          src=${Recipes[i].image_url}
          class="card-img-top  w-100 rounded-3 recipesImg "
          alt="..."
        />
      </div>
      <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold  text-center fw-bold recipesTitle">${Recipes[i].title}</h5>
        <div class="cardAction  ">
           <div class="d-flex justify-content-between flex-column flex-lg-row  align-items-center">
           <button onclick='getRecipesDetails(${Recipes[i].recipe_id})' class="details  w-100 d-block me-lg-2 btn btn-outline-danger rounded-5 border-2 mb-2 recipesDetailsBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Details <i class="fa-solid fa-book-open-reader"></i>
          </button>
            <a href="#" class="btn btn-outline-danger  border-2 rounded-5 w-100 mb-2 recipesSourse" target='_blank'
            >Source<i class="fa-solid fa-share ms-2 fa-sm"></i
          ></a>
          </div>
         
        </div>
      </div>
    </div>
  </div>
    `;
  }
  recipesMenu.innerHTML = cols;
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
      massage.classList.add("d-none");
      restFormValues();
      loginform = true;
      alreadyRegistered();
    } else {
      massage.classList.remove("d-none");
      massage.innerHTML = `Invalid username or password`;
    }
  }
}

function closeModal() {
  signBtn.setAttribute("data-bs-dismiss", "modal");
  signBtn.setAttribute("aria-label", "Close");
}

function closelogin() {
  for (let i = 0; i < RegisteredUserData.length; i++) {
    if (
      RegisteredUserData[i].user == user.value &&
      RegisteredUserData[i].password == password.value &&
      loginform &&
      password.classList.contains("is-valid") &&
      user.classList.contains("is-valid") &&
      signBtn.classList.contains("btn-outline-success")
    ) {
      closeModal();
    }
  }
}
user.addEventListener("keyup", function () {
  closelogin();
  massage.classList.add("d-none");
});
password.addEventListener("keyup", function () {
  closelogin();
  massage.classList.add("d-none");
});

function openmodel() {
  signBtn.removeAttribute("data-bs-dismiss");
  signBtn.removeAttribute("aria-label");
}

userIcon.addEventListener("click", function () {
  if (userIcon.classList.contains("Logged")) {
    openmodel();
  }
});

async function getRecipesDetails(id) {
  let food = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  let foodData = await food.json();
  console.log(foodData.recipe);
  let detailsRestrive = `
  <div class="modal-content resipeDetales  container">
  <div class="modal-header border-0  ">
    <a class="navbar-brand me-auto fw-bold logo py-2" href="#"
      ><img src="" alt=""
    /></a>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body row ">
    <div class="modelImg  col-lg-6 col-12">
      <img src="${
        foodData.recipe.image_url
      }" class=" img-fluid detilasImg rounded-4" alt="">
    </div>
    <div class="col-lg-6 col-12">
      <h4 class="mt-3 mb-4 fw-bold">Sweet Potato Kale Pizza with Rosemary & Red Onion</h4>
      <h5 class='mb-3 fw-bold'>Ingredients 🍴 :
      </h5>
      <div class="form-check">
    ${foodData.recipe.ingredients.map((item, index) => {
      return `<li class="">
        <input class="form-check-input" type="checkbox" value="" id=${
          item.charAt(5) + index
        }>
        <label class="form-check-label" for=${item.charAt(5) + index}>
          ${item}
        </label>
      </li>`;
    })}
        
      </div>
      <div class="publcher ">
        <p class="d-flex justify-content-start mt-5 ms-4 align-items-center">Publisher :<span class="me-3 fw-bold">${
          foodData.recipe.publisher
        }</span> <a href="${
    foodData.recipe.source_url
  }" class="btn btn-outline-danger rounded-4 me-1 mb-2 recipesSourse" target='_blank'
          ><i class="fa-solid fa-arrow-up-right-from-square"></i
        ></a></p>
       
      </div>
    </div>
  </div>
  <div class="modal-footer border-0">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    
  </div>
</div>
  `;
  detailsDialoge.innerHTML = detailsRestrive;
}
