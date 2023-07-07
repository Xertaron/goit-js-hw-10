const API_KEY =
  'live_sDzgYyI0zW5jojywScALtiCySJRBMTtVMyoNMwqizuXCadZ4oFLvfH6Pn2BmehVs';

function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds').then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export { fetchBreeds, fetchCatByBreed };
