const apiKey = "9ht5U2BA";

const fetchArt = async () => {
  const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&involvedMaker=Rembrandt+van+Rijn`);
  const data = await response.json();
  console.log(data);
}

fetchArt();