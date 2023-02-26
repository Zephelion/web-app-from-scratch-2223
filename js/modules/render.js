export const container = document.querySelector("main ul");
export const main = document.querySelector("main");

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
    const section = document.querySelector(".empty-container");
  
    main.classList.add("flex");
  
    section.innerHTML = `
        <h2>Can't find artist with name '${searchTerm}'</h2>
        <p>Try searching for a different artist</p>
      `;
}