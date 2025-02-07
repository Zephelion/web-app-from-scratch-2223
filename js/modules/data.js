import { displayArt } from "./render.js";
import { appendEmpty } from "./render.js";
import { container } from "./render.js";
import { main } from "./render.js";
import { appendError } from "./render.js";
import {displayLoading, hideLoading} from "./loading.js";
import apiKey from "./apikey.js";
import section from "./render.js";
export const domain = "https://www.rijksmuseum.nl/api/nl/collection/";

const limit = 30;
var page = 1;
let loading = false;



export const initialFetchArt = async () => {

  try{
    const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
    const data = await response.json();
    
    const paintings = data.artObjects;
    displayArt(paintings, "main ul");
  }catch(err){
    appendError();
  }
  
}

export const loadMoreArt = async () => {
  page++;
  loading = true;

  if(loading){
    displayLoading();
    const response = await fetch(`${domain}?key=${apiKey}&p=${page}&ps=${limit}`);
    const data = await response.json();
  
    const morePaintings = data.artObjects;
  
    displayArt(morePaintings, "main ul");
    hideLoading();
    loading = false;
  }
}

export const searchArt = async (searchTerm) => {
  const response = await fetch(`${domain}?key=${apiKey}&q=${searchTerm}&p=${page}&ps=10`);
  const data = await response.json();

  const paintingsOfMaker = data.artObjects;

  if(paintingsOfMaker.length == 0){
    appendEmpty(searchTerm)

  }else{

    container.innerHTML = "";
    section.innerHTML = "";
    main.classList.remove("flex");
    console.log(paintingsOfMaker);
    displayArt(paintingsOfMaker, "main ul");
  }
  
}

export const getSmallerImg = async (objectNumber) => {
  try{
    const smallerImg = await fetch(`${domain}${objectNumber}/tiles?key=${apiKey}`);
    const data = await smallerImg.json();
  
    const z4s = data.levels.filter(level => level.name == "z4");
    const z4 = z4s[0].tiles[0].url.replace("http", "https");
  
    return z4;

  }catch(err){
    
    return "https://rkd.nl/images/partners/rijksmuseum-logo.jpg";

  }

}

export const getRelatedPaintings = async (maker) => {
  const response = await fetch(`${domain}?key=${apiKey}&involvedMaker=${maker}&ps=10`);
  const data = await response.json();

  const relatedPaintings = data.artObjects;
  
  return relatedPaintings;
}

