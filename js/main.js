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
let reguser = document.querySelector(".reguser");
let likebtn = document.querySelectorAll(".likebtn");
let lovedRecipes = document.querySelector(".lovedRecipes");
let test = document.querySelector(".test");
let loveICon = document.querySelector(".loveICon");
let regmail = document.querySelector(".regmail");
let logerrorMsg = document.querySelector(".logerrorMsg");
let logmail = document.querySelector(".logmail");
let logMsg = document.querySelector(".logMsg");
let logpass = document.querySelector(".logpass");
let badge = document.querySelector(".badge");
let loguser = document.querySelector(".loguser");
let sucseesMsg = document.querySelector(".sucseesMsg");
let RegisterBtn = document.querySelector(".RegisterBtn");
let regpass = document.querySelector(".regpass");
let userIcon = document.getElementById("userIcon");
let logbtn = document.querySelector(".logbtn");
let pwFields = document.querySelectorAll(".password");
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
let favRecipesList = [];

// *******************************************************************************
//ckeak for logged user
let users = [];
if (localStorage.getItem("allusers") == null) {
  users = [];
} else {
  users = Array.from(JSON.parse(localStorage.getItem("allusers")));
}

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
  console.log(Recipeslist);
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
        class="popCardImg bg-danger-subtle p-2 d-flex justify-content-center align-items-center rounded-4 position-relative"
      >
      <button onclick='addToFav(${JSON.stringify(
        Recipes[i].recipe_id
      )})'   class="btn  bg-danger-subtle ms-3 rounded-5   position-absolute top-0 start-0 mt-3">
      <i  class="fa-regular  d-block fa-heart loveICon p-2"></i>
    </button>
        <img
          src=${Recipes[i].image_url}
          class="card-img-top  w-100 rounded-3 recipesImg "
          alt=${Recipes[i].title}
        />
      </div>
      <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold  text-center fw-bold recipesTitle">${
          Recipes[i].title
        }</h5>
        <div class="cardAction  ">
           <div class="d-flex justify-content-between flex-column flex-lg-row  align-items-center">
           <button onclick='getRecipesDetails(${
             Recipes[i].recipe_id
           })' class="details  w-100 d-block me-lg-2 btn btn-outline-danger rounded-5 border-2 mb-2 recipesDetailsBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Details <i class="fa-solid fa-book-open-reader"></i>
          </button>
            <a href=${
              Recipes[i].source_url
            } class="btn btn-outline-danger  border-2 rounded-5 w-100 mb-2 recipesSourse" target='_blank'
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
      <div class="publisher">
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
// validate user
reguser.addEventListener("keyup", function () {
  if (usernameRegex.test(reguser.value)) {
    reguser.classList.remove("is-invalid");
    reguser.classList.add("is-valid");
  } else {
    reguser.classList.remove("is-valid");
    reguser.classList.add("is-invalid");
  }
});
// validate mail
regmail.addEventListener("keyup", function () {
  if (emailRegex.test(regmail.value)) {
    regmail.classList.remove("is-invalid");
    regmail.classList.add("is-valid");
  } else {
    regmail.classList.remove("is-valid");
    regmail.classList.add("is-invalid");
  }
});
// validate password
regpass.addEventListener("keyup", function () {
  if (passwordRegex.test(regpass.value)) {
    regpass.classList.remove("is-invalid");
    regpass.classList.add("is-valid");
  } else {
    regpass.classList.remove("is-valid");
    regpass.classList.add("is-invalid");
  }
});

// add to local storage
RegisterBtn.addEventListener("click", function () {
  if (
    reguser.classList.contains("is-valid") &&
    regpass.classList.contains("is-valid") &&
    regmail.classList.contains("is-valid") &&
    reguser.value.length > 0 &&
    regpass.value.length > 0 &&
    regmail.value.length > 0
  ) {
    let user = {
      username: reguser.value,
      password: regpass.value,
      email: regmail.value,
    };
    users.push(user);
    localStorage.setItem("allusers", JSON.stringify(users));

    sucseesMsg.innerHTML = `
    👋 ${reguser.value}, your account is Ready , go to login now !!
    `;
    sucseesMsg.classList.remove("d-none");
    reguser.value = "";
    regmail.value = "";
    regpass.value = "";
  }
});
console.log(users);

//login user
logbtn.addEventListener("click", function () {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == logmail.value && users[i].password == logpass.value) {
      logMsg.innerHTML = `
      👋 you are logged in successfully !!
      `;
      logMsg.classList.remove("d-none");
      userIcon.innerHTML = users[i].username;
      userIcon.classList.add("p-4");
      logerrorMsg.classList.add("d-none");
      logmail.value = "";
      logpass.value = "";
    } else {
      logerrorMsg.innerHTML = ` Wrong Password or Email !`;
      logerrorMsg.classList.remove("d-none");
    }
  }
});

//add loved recipes to recipes cart
function addToFav(id) {
  for (let i = 0; i < Recipeslist.length; i++) {
    if (Recipeslist[i].recipe_id == id) {
      favRecipesList.push(Recipeslist[i]);
    }
  }
  localStorage.setItem("favRecipes", JSON.stringify(favRecipesList));
  displayFavRecipes();
}
//display favRecipes
function displayFavRecipes() {
  let col = ``;
  for (let i = 0; i < favRecipesList.length; i++) {
    col += `
  
    <div class="col-12 mb-3">
    <div class="card h-100 border-0 shadow rounded-4 border-0">
      <div
        class="popCardImg bg-danger-subtle p-2 d-flex justify-content-center align-items-center rounded-4 position-relative"
      >
    
        <img
          src=${favRecipesList[i].image_url}
          class="card-img-top  w-100 rounded-3 recipesImg "
          alt=''
        />
      </div>
      <div class="card-body">
        <h5 class="card-title fs-6 fw-semibold  text-center fw-bold recipesTitle">${
          favRecipesList[i].title
        }</h5>
        </h5>
        <div class="cardAction  ">
           <div class="d-flex justify-content-between flex-column flex-lg-row  align-items-center">
           <button onclick='getRecipesDetails(${
             favRecipesList[i].recipe_id
           })'  class="details  w-100 d-block me-lg-2 btn btn-outline-danger rounded-5 border-2 mb-2 recipesDetailsBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Details <i class="fa-solid fa-book-open-reader"></i>
          </button>
            <a href=${
              favRecipesList[i].source_url
            } class="btn btn-outline-danger  border-2 rounded-5 w-100 mb-2 recipesSourse" target='_blank'
            >Source<i class="fa-solid fa-share ms-2 fa-sm"></i
          ></a>
          
          </div>
          <button onclick='removeFav(${JSON.stringify(
            favRecipesList[i].recipe_id
          )})'  class="details  w-100 d-block me-lg-2 btn btn-outline-danger rounded-5 border-2 mb-2 recipesDetailsBtn" >
          Remove <i class="fa-solid fa-book-open-reader"></i>
        </button>
        </div>
      </div>
    </div>
  </div>
  `;
  }
  lovedRecipes.innerHTML = col;
  badge.innerHTML = favRecipesList.length;
}
//save favRecpes
if (localStorage.getItem("favRecipes") == null) {
  favRecipesList = [];
} else {
  favRecipesList = JSON.parse(localStorage.getItem("favRecipes"));
  displayFavRecipes();
}

//remove unwanted recp
function removeFav(id) {
  for (let i = 0; i < favRecipesList.length; i++) {
    if (favRecipesList[i].recipe_id == id) {
      favRecipesList.splice(i, 1);
    }
  }
  localStorage.setItem("favRecipes", JSON.stringify(favRecipesList));
  displayFavRecipes();
}
badge.innerHTML = 0;
