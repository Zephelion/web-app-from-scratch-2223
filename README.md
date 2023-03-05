# Web App From Scratch 2022-2023

In this course you will learn to build a web application without frameworks or unnecessary libraries, but with vanilla HTML, CSS & JavaScript as much as possible. The end result is a modular, single page web app (SPA). Data will be retrieved from an external API, manipulated and finally shown in the UI of the App. You will learn to apply interface principles when building and testing the interface. With the gained knowledge you will be able to build interactive prototypes, based on a user story and real data. Also you will gain a better understanding of how API's, frameworks and libraries work.

## Assignment

1. [Single Page App](https://github.com/cmda-minor-web/web-app-from-scratch-2223/blob/master/course/week-2.md): Design and build a single page web app based on a User Story.

---

## Chosen user story

As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art during a lockdown [Rijksmuseum - RijksData API](https://data.rijksmuseum.nl/object-metadata/api/)


## Api investigation

### Rijksdata
 
![alt text](images/rijksdata.png "Rijks data")

Rijksmuseum data services provide access to object metadata, bibliographic data, controlled vocabularies and user generated content. These pages comprise the technical documentation of RijksData, also available are a general introduction, as well as the open data policy of the museum. In order to use the api you must require an API key by registering for a Rijksstudio account.
[Rijks data api](https://data.rijksmuseum.nl/)


## Best Practices

All work during this course will be tested against our [Best Practices for JavaScript](https://github.com/cmda-minor-web/best-practices/blob/master/javascript.md).

* Avoid global variables as much as possible
* code attribution/plagiarism
* OOP versus functional programming
* Using InnerHTML
* Cache elements in variables
* Split fetch url in variables
* Keep functions simple and focused
* Waterfall vs returning values
* Dry
* var,let or const
* for versus forEach
* Avoid inline css
* Loading external script files
* Properly handle loaded state
* object destructuring


## Week 1
### Design
Explore page             |  Details
:-------------------------:|:-------------------------:
![design 1](images/miro1.png)  |  ![design 2](images/miro2.png)

I took inspiration from the Instagram explore page in order to make this design. In order to show the details of a certain painting I would create a small animation where the painting would flip and show further information. The application will also have a search where the user can browse through the catalogue.

### Fetching data
I used async/await method to fetch data. what is aysnc and await you might ask :open_mouth:

#### Async and await
Inside an async function, you can use the await keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is thrown.

**Example**
```
const fetchArt = async () => {
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&involvedMaker=Rembrandt+van+Rijn`);
  const data = await response.json();
  console.log(data);
}
```
Next I decided to append the data to the Html. I created a displayArt function to do that. I emptied the list container and used the forEach functionality to loop over each painting and insert them into the Html by using innerHTML. See code below.
```
const displayArt = (paintings) => {
    container.innerHTML = "";

    paintings.forEach(painting => {
        var liHtml = `<li><img src="${painting.webImage.url}" alt="" srcset=""></li>`;

        container.innerHTML += liHtml;
    });
}

```

Later I invoked the displayArt within the fetchArt scope and invoked the fetchArt in the global scope.
```
const fetchArt = async () => {
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&involvedMaker=Rembrandt+van+Rijn`);
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

fetchArt();
```
For the UI I added a small hover on.

```
main ul li:hover{
    transform: scale(1.2);
    transition: 0.5s;
}

main ul li img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### Wrap up week 1
How the application currently looks like.
<p style="text-align:center;">
<img src="images/week1progress.png" alt="progress 1" width="300">
</p>


## Rubric

Your efforts will be graded using a single point rubric (see below). You will have to pass the criterion (centre column) to pass the course. During the test you will be consulted and will be given feedback on things we think deficient and things we think are an improvement on the criterion.

| Deficiency | Criterion | Improvement |
|:--|:--|:--|
|  | *User Interface* - you design, build and test the user interface by applying interface design principles |  |
|  | *Code structure* - you write modular, consistent and efficient HTML, CSS and JavaScript code by applying structure and best practices. You manage state for the application and the UI |  |
|  | *Data management* - you understand how you can work with an external API using asynchronous code. You can retrieve data, manipulate and dynamically convert it to structured html |  |
|  | *Project* - your app is working and published on GitHub Pages. Your project is thoroughly documented in the `README.md` file in your repository.  |  |

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice poster image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜 (or is it a licence?) 🤷 -->
