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