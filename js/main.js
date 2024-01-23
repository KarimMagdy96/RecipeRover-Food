let searchQueries = Array.from(document.querySelectorAll(".searchQuerie"));
let titleHolder = document.getElementById("titleHolder");
let recipesTitle = Array.from(document.querySelectorAll(".recipesTitle"));
let recipesSourse = Array.from(document.querySelectorAll(".recipesSourse"));
let loadscreen = document.getElementById("loadscreen");
let bodyVisable = document.getElementById("bodyVisable");
let recipesMenu = document.getElementById("recipesMenu");
let formContainer = document.querySelector(".form_container");
let sowHidePw = document.querySelectorAll(".sowHidePw");
let signUp = document.querySelector(".signup-text");
let loginText = document.querySelector(".login-text");

let userIcon = document.getElementById("userIcon");
pwFields = document.querySelectorAll(".password");
let detailsDialoge = document.getElementById("detailsDialoge");
let details = Array.from(document.getElementsByClassName("details"));
const usernameRegex = /^(user|[\w-]{3,16})$/;
const emailRegex = /^(e@mail\.com|[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(1234|\d{8,12})$/;
let recipesDetailsBtn = Array.from(
  document.querySelectorAll(".recipesDetailsBtn")
);
let searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);
let recipesImg = Array.from(document.querySelectorAll(".recipesImg"));
let Recipeslist;

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

//user validation

//  sign up

//rest fORM FOR LOGIN

//get recipes details
async function getRecipesDetails(id) {
  let food = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  let foodData = await food.json();

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
      <h4 class=" mb-4 fw-bold mt-3 mt-md-0 ">${foodData.recipe.title}</h4>
      <h5 class='mb-3 fw-bold'>Ingredients 🍴 :
      </h5>
      <div class="form-check">
    ${foodData.recipe.ingredients.map((item, index) => {
      return `
      <ul class="list-unstyled">
      <li class="">
        <input class="form-check-input" type="checkbox" value="" id=${
          item.charAt(5) + index
        }>
        <label class="form-check-label" for=${item.charAt(5) + index}>
          ${item}
        </label>
      </li>
      </ul>
      `;
    })}
        
      </div>
      <div class="publcher  ">
        <p class="d-flex  justify-content-start mt-5 align-items-center fw-bold"><span class=" fw-bold"></span> <a href="${
          foodData.recipe.source_url
        }" class="btn btn-outline-danger rounded-4  recipesSourse" target='_blank'
          >${
            foodData.recipe.publisher
          }<i class="fa-solid fa-person-walking-arrow-right ms-1  "></i
        ></a></p>
       
      </div>
    </div>
  </div>
  <div class="modal-footer border-0">
    <button type="button" class="btn bg-danger-subtle  fw-bold px-5 rounded-5" data-bs-dismiss="modal">Close</button>
    
  </div>
</div>
  `;
  detailsDialoge.innerHTML = detailsRestrive;
}

// login form show password or hide
sowHidePw.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    pwFields.forEach((pwFields) => {
      if (pwFields.type == "password") {
        pwFields.type = "text";
        sowHidePw.forEach((eyeIcon) => {
          eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
        });
      } else {
        pwFields.type = "password";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
      }
    });
  });
});

// move between login and sign up
signUp.addEventListener("click", () => {
  formContainer.classList.add("hide");
});
loginText.addEventListener("click", () => {
  formContainer.classList.remove("hide");
});
