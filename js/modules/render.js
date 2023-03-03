export const container = document.querySelector("main ul");
export const main = document.querySelector("main");
const section = document.querySelector(".empty-container");

export const displayArt = (paintings) => {

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

export const appendSearch = (searchTerm) => {
    container.innerHTML = "";
  
    main.classList.add("flex");
  
    section.innerHTML = `
        <h2>Can't find artist with name '${searchTerm}'</h2>
        <p>Try searching for a different artist</p>
      `;
}

export const appendMain = (artDetails) => {
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

export default section;