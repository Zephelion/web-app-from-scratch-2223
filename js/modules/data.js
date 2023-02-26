import { displayArt } from "./render.js";
import { appendSearch } from "./render.js";
import { container } from "./render.js";
import { main } from "./render.js";
import apiKey from "./apikey.js";

// const apiKey = "9ht5U2BA";
const limit = 30;
var page = 1;

export const initialFetchArt = async () => {

  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&p=${page}&ps=${limit}`);
  const data = await response.json();
  
  const paintings = data.artObjects;
  displayArt(paintings);
  
}

export const loadMoreArt = async () => {
  page++;
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&p=${page}&ps=${limit}`);
  const data = await response.json();

  const morePaintings = data.artObjects;

  displayArt(morePaintings);
}

export const searchArt = async (searchTerm) => {
  console.log(searchTerm);
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&q=${searchTerm}&p=${page}&ps=10`);
  const data = await response.json();

  const paintingsOfMaker = data.artObjects;

  if(paintingsOfMaker.length == 0){
    appendSearch(searchTerm)

  }else{

    container.innerHTML = "";
    main.classList.remove("flex");
    console.log(paintingsOfMaker);
    displayArt(paintingsOfMaker);
  }
  
}

