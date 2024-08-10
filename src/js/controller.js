import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import * as model from "./model.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { TIMEOUT_CLOSE_SEC } from "./config.js";

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (id === "") return;
    recipeView.renderSpinner();

    resultsView.update(model.getSerachResultsPage());
    bookmarksView.update(model.state.bookmarks);

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError(err);
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    resultsView.renderSpinner();
    resultsView.render(model.getSerachResultsPage());

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    searchView.renderError(err);
  }
};

const paginationcontrol = function (gotoPage) {
  resultsView.render(model.getSerachResultsPage(gotoPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings = 4) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  try {
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.delBookmark(model.state.recipe.id);

    recipeView.update(model.state.recipe);

    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    bookmarksView.renderError(err);
  }
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.sendRecipe(newRecipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(() => {
      addRecipeView.toggleClass();
    }, TIMEOUT_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error);
  }
};

// Publlisher-Subscriber method
const init = function () {
  bookmarksView.addHandlerLoad(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(paginationcontrol);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
