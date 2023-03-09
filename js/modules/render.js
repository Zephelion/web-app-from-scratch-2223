// import apiKey  from "./apikey.js";
import { getSmallerImg } from "./data.js";
import { spinner } from "./loading.js";
import { getRelatedPaintings } from "./data.js";

export const container = document.querySelector("main ul");
export const main = document.querySelector("main");

export const item = document.querySelector("main ul li a");

const section = document.querySelector(".empty-container");

export const displayArt = async (paintings) => {

    paintings.forEach(async painting => {
      
      const objectNumber = painting.objectNumber;
      const smallImg = await getSmallerImg(objectNumber);
      
        var liHtml = `
        <li class="loading">
          <a href="#${painting.objectNumber}">
            <img src="${smallImg}" alt="${painting.title}" srcset="">
          </a>
        </li>`;
  
        container.insertAdjacentHTML("beforeend", liHtml);
        const lastLi = container.lastElementChild;
  
        setTimeout(() => {
          lastLi.classList.remove("loading");
        }, 400);
  
    });
}

const displayRelatedArt = async (relatedPaintings) => {

  const relatedContainer = main.querySelector(".related ul");
  console.log(relatedContainer)

  relatedPaintings.forEach(async relatedPainting => {
    var html = `
        <li class="loading">
          <a href="#${relatedPainting.objectNumber}">
            <img src="${relatedPainting.webImage.url}" alt="${relatedPainting.title}" srcset="">
          </a>
        </li>
    `

    // console.log(html)
    relatedContainer.insertAdjacentHTML("beforeend", html);
    const lastLi = relatedContainer.lastElementChild;

    setTimeout(() => {
      lastLi.classList.remove("loading");
    }, 400);
  }); 
}

export const appendEmpty = (searchTerm) => {
    container.innerHTML = "";
    spinner.innerHTML = "";
  
    main.classList.add("flex");
  
    section.innerHTML = `
        <h2>Can't find artist with name '${searchTerm}'</h2>
        <p>Try searching for a different artist</p>
      `;
}

export const appendMain = async (artDetails) => {
  
  const maker = artDetails.principalOrFirstMaker;
  const relatedPaintings = await getRelatedPaintings(maker);
  // await displayRelatedArt(relatedPaintings);

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
    </section>
    <section class="related">
      <h2>Related paintings</h2>
        <ul></ul>
    </section>`;

  
  main.insertAdjacentHTML("beforeend", html);

  displayRelatedArt(relatedPaintings);
  
}

export const appendError = () => {
  main.innerHTML = "";
  
  main.classList.add("flex");
  
  main.innerHTML = `
      <h2>Something went wrong</h2>
    `;
}

export default section;