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