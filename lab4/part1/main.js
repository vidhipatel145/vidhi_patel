<!--
Name: Vidhi Patel
File:main.js
Date: 1 dec 2024
silly story generator
-->



let customName = document.getElementById("customName");
let randomize = document.getElementById("randomize");
let story = document.getElementById("story");

let storyText = "Once upon a time, :insertx: went to the :inserty: and saw a :insertz:.";
let insertX = ["Bob", "Alice", "Charlie"];
let insertY = ["park", "mall", "beach"];
let insertZ = ["dog", "robot", "dragon"];

function randomValueFromArray(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

randomize.addEventListener("click", result);

function result() {
  let newStory = storyText;
  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);

  // Replace placeholders with random values
  newStory = newStory.replace(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  if (customName.value !== "") {
    let name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    let weight = Math.round(300 / 14) + " stone";
    let temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 fahrenheit", temperature);
  }

  story.textContent = newStory;
}
