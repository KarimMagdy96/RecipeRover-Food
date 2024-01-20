var searchQueries = Array.from(document.querySelectorAll(".searchQuerie"));
var titleHolder = document.getElementById("titleHolder");
var searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);
var searchQuerieCard = Array.from(
  document.querySelectorAll(".searchQuerieCard")
);

var recipesImg = Array.from(document.querySelectorAll(".recipesImg"));
var recipeName = "Pizza";
for (var i = 0; i < searchQueries.length; i++) {
  searchQueries[i].addEventListener("click", function (e) {
    getRecipes(e.target.innerHTML);
  });
}

for (var r = 0; r < searchQuerieCard.length; r++) {
  searchQuerieCard[r].addEventListener("click", function (e) {
    console.log(e.target.closest("div").innerText);
    if (e.target.closest("div").innerText != null) {
      getRecipes(e.target.closest("div").innerText);
    }
  });
}

// get all recipes
async function getRecipes(category) {
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${category}`
  );
  var Recipes = await response.json();
  displayRecipes(Recipes.recipes);
}
// display recipes

function displayRecipes(Recipes) {
  for (var i = 0; i < Recipes.length; i++) {
    recipesImg[i].src = Recipes[i].image_url;
    recipesImg[i].alt = Recipes[i].title;
  }
}
