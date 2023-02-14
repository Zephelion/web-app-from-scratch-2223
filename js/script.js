const apiKey = "9ht5U2BA";
const container = document.querySelector("main ul");

console.log(container);

const fetchArt = async () => {
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&involvedMaker=Rembrandt+van+Rijn`);
  const data = await response.json();
  
  const paintings = data.artObjects;
  displayArt(paintings);
}

const displayArt = (paintings) => {
    container.innerHTML = "";

    paintings.forEach(painting => {
        var liHtml = `<li><img src="${painting.webImage.url}" alt="" srcset=""></li>`;

        container.innerHTML += liHtml;
    });
}

fetchArt();