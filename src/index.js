console.log("%c HI", "color: firebrick");
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

// Wait for page to load before running code
document.addEventListener("DOMContentLoaded", function () {
  // Get dog images
  fetchThings(imgUrl, renderDogs);

  // Get dog breeds
  fetchThings(breedUrl, sortList);
});

function fetchThings(url, nextFn) {
  fetch(url)
    .then(resp => resp.json())
    .then(json => nextFn(json));
}

function renderDogs(breeds) {
  const imgBlock = document.getElementById("dog-image-container");

  breeds.message.forEach(breed => {
    const image = document.createElement("img");
    image.src = breed;
    imgBlock.appendChild(image);
  });
}

function listDogs(breeds, letter = "a") {
  console.log(letter);
  const ulBlock = document.getElementById("dog-breeds");

  // Clear current list
  ulBlock.innerHTML = "";

  // Returned message includes a key for each breed.
  // Therefore, I'm using the .keys method on Object.
  Object.keys(breeds.message).forEach(breed => {
    if (breed[0] === letter) {
      const listItem = document.createElement("li");
      listItem.innerText = breed;

      listItem.addEventListener("click", event => {
        event.preventDefault();
        if (listItem.style.color !== "blue") {
          listItem.style.color = "blue";
        } else {
          listItem.style.color = "black";
        }
      });
      ulBlock.appendChild(listItem);
    }
  });
}

function sortList(breeds) {
  listDogs(breeds);

  // Add event listener to drop down
  document.getElementById("breed-dropdown").addEventListener("click", event => {
    event.preventDefault();
    firstLetter = document.getElementById("breed-dropdown").value;
    listDogs(breeds, firstLetter);
  });
}
