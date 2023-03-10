import { initialFetchArt } from "./modules/data.js";
import { loadMoreArt } from "./modules/data.js";
import {checkHash} from "./modules/route.js";
import {onRouteChanged} from "./modules/route.js";
import {searchArt} from "./modules/data.js";

const searchInput = document.getElementById("search");
const form = document.querySelector("form");

let fired = false;


window.addEventListener("scroll", () => {
  const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
  
  if(endOfPage && !fired) {
    
    loadMoreArt();
    fired = true;
  }else if(!endOfPage){
    fired = false;
  }


});


initialFetchArt();
window.addEventListener("load", checkHash);
window.addEventListener("hashchange", onRouteChanged);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  searchArt(searchTerm);
});
