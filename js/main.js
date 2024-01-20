var searchQueries = Array.from(document.querySelectorAll(".searchQuerie"));
var titleHolder = document.getElementById("titleHolder");
var recipesTitle = Array.from(document.querySelectorAll(".recipesTitle"));
var recipesSourse = Array.from(document.querySelectorAll(".recipesSourse"));
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
}

// get all recipes
async function getRecipes(category) {
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${category}`
  );
  var Recipes = await response.json();
  Recipeslist = Recipes.recipes;
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
