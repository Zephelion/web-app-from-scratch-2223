import { initialFetchArt } from "./modules/data.js";
import { loadMoreArt } from "./modules/data.js";
import { searchArt } from "./modules/data.js";
import apiKey from "./modules/apikey.js";


const searchInput = document.getElementById("search");
const form = document.querySelector("form");
var throttleTimer;

let fired = false;


const appendMain = (artDetails) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  var html = `
    <figure>
      <img src="${artDetails.webImage.url}" alt="">
      <figcaption>${artDetails.title}</figcaption>
    </figure>
    <h3>${artDetails.principalMaker} - ${artDetails.id}</h3>
    <section>
      <h2>${artDetails.dating.presentingDate}</h2>
      <p>${artDetails.description}</p>
      <p>${artDetails.subTitle}</p>
    </section>`;
  main.insertAdjacentHTML("beforeend", html);
  console.log(artDetails);
}

const handleRouting = async (objectNumber) => {
  var objectNumber = objectNumber.replace("#", "");
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`);
  const data = await response.json();


  const artDetails = data.artObject;
  appendMain(artDetails);
}


window.addEventListener("scroll", () => {
  const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  console.log(endOfPage);
  
  if(endOfPage && !fired) {
    
    loadMoreArt();
    console.log("end of page");
    fired = true;
  }else if(!endOfPage){
    fired = false;
  }


});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  searchArt(searchTerm);
});

const onRouteChanged = () => {
  const hash = window.location.hash;

  console.log(hash)
  if(hash == ""){
    console.log("home");
    window.location = "index.html";
  }else{
    handleRouting(hash);
  }
};


const checkHash = () => {
  console.log(window.location.hash);
  if(window.location.hash) { 
    onRouteChanged();
  }
}

initialFetchArt();
window.addEventListener("load", checkHash);
window.addEventListener("hashchange", onRouteChanged);
