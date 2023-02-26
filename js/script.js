const apiKey = "9ht5U2BA";
const container = document.querySelector("main ul");
const searchInput = document.getElementById("search");
const form = document.querySelector("form");
var throttleTimer;
const limit = 30;
var page = 1;


let fired = false;
// const throttle = (callback, time) => {

//     if (throttleTimer) return;

//     throttleTimer = true;

//     setTimeout(() => {
//       callback();
//       throttleTimer = false;
//     }, time);
// }

const initialFetchArt = async () => {

  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&p=${page}&ps=${limit}`);
  const data = await response.json();
  
  const paintings = data.artObjects;
  displayArt(paintings);
  
}


const loadMoreArt = async () => {
  page++;
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&p=${page}&ps=${limit}`);
  const data = await response.json();

  const morePaintings = data.artObjects;

  displayArt(morePaintings);
}

const displayArt = (paintings) => {

    paintings.forEach(painting => {
        var liHtml = `
        <li class="loading">
          <a href="#${painting.objectNumber}">
            <img src="${painting.webImage.url}" alt="${painting.title}" srcset="">
          </a>
        </li>`;

        container.insertAdjacentHTML("beforeend", liHtml);
        const lastLi = container.lastElementChild;

        setTimeout(() => {
          lastLi.classList.remove("loading");
        }, 400);

    });
}

const searchArt = async (searchTerm) => {
  console.log(searchTerm);
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&q=${searchTerm}&p=${page}&ps=10`);
  const data = await response.json();

  const paintingsOfMaker = data.artObjects;

  if(paintingsOfMaker.length == 0){
    container.innerHTML = "";
    const section = document.querySelector(".empty-container");
    const main = document.querySelector("main");

    main.classList.add("flex");

    section.innerHTML = `
        <h2>Can't find artist with name '${searchTerm}'</h2>
        <p>Try searching for a different artist</p>
      `;
  }else{

    container.innerHTML = "";
    paintingsOfMaker.forEach(painting => {
      var liHtml = `
      <li class="loading">
        <a href="#${painting.objectNumber}">
          <img src="${painting.webImage.url}" alt="${painting.title}" srcset="">
        </a>
      </li>`;

      container.insertAdjacentHTML("beforeend", liHtml);
      const lastLi = container.lastElementChild;

      setTimeout(() => {
        lastLi.classList.remove("loading");
      }, 400);
    });
  }
  
}

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
