import { appendMain } from "./render.js";
import {domain} from "./data.js";
import {appendError} from "./render.js";
import apiKey from "./apikey.js";


const handleRouting = async (objectNumber) => {
  try{
    var objectNumber = objectNumber.replace("#", "");
    const response = await fetch(`${domain}${objectNumber}?key=${apiKey}`);

    const data = await response.json();
  
    const artDetails = data.artObject;
    appendMain(artDetails);

  }catch(err){
    console.log(err);
    appendError();
  }
}


export const onRouteChanged = () => {
    const hash = window.location.hash;
    (hash == "" ? window.location = "index.html" : handleRouting(hash))
  };
  
  
export const checkHash = () => {
  (window.location.hash ? onRouteChanged() : "");
}