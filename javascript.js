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
  list.forEach(e => container.innerHTML += templateMovies(e));
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
})();