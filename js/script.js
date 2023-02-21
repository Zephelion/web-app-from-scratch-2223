const apiKey = "9ht5U2BA";
const container = document.querySelector("main ul");
const searchInput = document.getElementById("search");
const form = document.querySelector("form");
var throttleTimer;
const limit = 30;
var page = 1;

console.log(form);


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

  console.log(data);
  
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
        var liHtml = `<li class="loading"><img src="${painting.webImage.url}" alt="${painting.title}" srcset=""></li>`;

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

  console.log(data);
  
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
const getDetails = async (objectNumber) => {
  var objectNumber = objectNumber.replace("#", "");
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`);
  const data = await response.json();


  const artDetails = data.artObject;
  appendMain(artDetails);
}

window.addEventListener("scroll", () => {
  const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;
  
  throttle(() => {

    if(endOfPage && !fired) {
      
      loadMoreArt();
      console.log("end of page");
      fired = true;
    }else if(!endOfPage){
      fired = false;
    }
    
  }, 1000);


});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchInput.value;
  searchArt(searchTerm);
});

const onRouteChanged = () => {
  const hash = window.location.hash;

  console.log(hash)
  getDetails(hash);
};

window.addEventListener("hashchange", onRouteChanged);


initialFetchArt();
// window.addEventListener("scroll", () => {
//   const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

//   throttle(() => {
//     if(endOfPage) {
//         console.log(endOfPage);
//         console.log("end of page");
//     }

//   },1000)

// });

initialFetchArt();