import { appendMain } from "./render.js";


const handleRouting = async (objectNumber) => {
    var objectNumber = objectNumber.replace("#", "");
    const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`);
    const data = await response.json();
  
  
    const artDetails = data.artObject;
    appendMain(artDetails);
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
    console.log(window.location.hash);
    if(window.location.hash) { 
      onRouteChanged();
    }
  }