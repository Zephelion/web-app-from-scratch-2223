const apiKey = "9ht5U2BA";
const container = document.querySelector("main ul");

console.log(container);

const throttle = (callback, time) => {

    if (throttleTimer) return;

    throttleTimer = true;

    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
}
const initialFetchArt = async () => {

  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?key=${apiKey}&p=${page}&ps=${limit}`);
  const data = await response.json();

  console.log(data);
  
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

initialFetchArt();