const containerAction = document.getElementById("container-action");
const containerAnimation = document.getElementById("container-animation");
const containerDrama = document.getElementById("container-drama");
const containerHorror = document.getElementById("container-horror");
const containerSciFi = document.getElementById("container-sci-fi");
const containerAdventure = document.getElementById("container-adventure");

function templateMovies(list) {
  return `<figure class="movie">
  <picture>
    <source media="(min-width: 768px)" srcset="${list.large_cover_image}">
    <source media="(min-width: 600px)" srcset="${list.medium_cover_image}">
    <img src="${list.small_cover_image}" alt="${list.synopsis}">
  </picture>
  <figcaption>${list.title_long}</figcaption>
</figure>` 
}

async function getData(url) {
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
}

function printData(list, container) {
  list.forEach(e => {
    container.innerHTML += templateMovies(e)
  });
}

(async function movieLists() {
  const url = "https://yts.mx/api/v2/list_movies.json?genre=src"
  const action = await getData(url.replace("src", "action"));
  const animation = await getData(url.replace("src", "animation"));
  const drama = await getData(url.replace("src", "drama"));
  const horror = await getData(url.replace("src", "horror"));
  const sciFi = await getData(url.replace("src", "sci-fi"));
  const adventure = await getData(url.replace("src", "adventure"));
  printData(action.data.movies, containerAction);
  printData(animation.data.movies, containerAnimation);
  printData(drama.data.movies, containerDrama);
  printData(horror.data.movies, containerHorror);
  printData(sciFi.data.movies, containerSciFi);
  printData(adventure.data.movies, containerAdventure);
  movieSelectionEvent();
})();

const searchResult = document.getElementById("search-result");

function templateSearchResult(movie) {
  return ` <figure class="result-figure">
  <picture>
    <img src="${movie.small_cover_image}" alt="Search result">
  </picture>
  <figcaption>${movie.title_long}</figcaption>
</figure>
<div>
  <h4>${movie.title}</h4>
  <a href="${movie.url}" target="_blank"><p>${movie.url}</p></a>
  <p>${movie.synopsis}</p>
  <p>${movie.genres}</p>
</div>`
}

const resultContainer = document.getElementById("result");

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", async event => {
  event.preventDefault();
  console.log(event);
  const query = new FormData(searchForm);
  const result = query.get("name");
  const url = "https://yts.mx/api/v2/list_movies.json?";
  const queryUrl = `${url}limit=1&query_term=${result}`;
  const getMovie = await getData(queryUrl);
  resultContainer.innerHTML = templateSearchResult(getMovie.data.movies[0]);
  console.log(getMovie.data.movies[0]);
  searchResult.classList.add("toggle");
})

function movieSelectionEvent() {
  const figureTags = document.getElementsByClassName("movie");
  for (e of figureTags) {
     e.addEventListener("click", () => {
       searchResult.classList.toggle("toggle");
     });
  }
}



