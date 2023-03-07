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
  
    console.log(hash)
    if(hash == ""){
      console.log("home");
      window.location = "index.html";
    }else{
      handleRouting(hash);
    }
  };
  
  
 export const checkHash = () => {
    if(window.location.hash) { 
      onRouteChanged();
    }
  }