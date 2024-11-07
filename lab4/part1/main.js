
const customName = document.getElementById('customname'); // Custom name input
const randomize = document.querySelector('.randomize');  // Button to trigger random story generation
const story = document.querySelector('.story');          // Paragraph to display the story


function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);  // Get a random index
  return array[random];  // Return the random item
}


let storyText = "Once upon a time, :insertx: went to the :inserty: and saw a :insertz:.";


let insertX = ["Bob", "Alice", "Charlie"];
let insertY = ["park", "mall", "beach"];
let insertZ = ["dog", "robot", "dragon"];


randomize.addEventListener('click', result);


function result() {
  let newStory = storyText;  // Make a copy of the story template


  let xItem = randomValueFromArray(insertX);  // Random value for insertx
  let yItem = randomValueFromArray(insertY);  // Random value for inserty
  let zItem = randomValueFromArray(insertZ);  // Random value for insertz

 
  newStory = newStory.replace(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  
  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);  // Replace 'Bob' with the custom name
  }

 
  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + " stone";  // Convert 300 pounds to stones
    const temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";  // Convert 94 Fahrenheit to Centigrade

   
    newStory = newStory.replace("300 pounds", weight);
    newStory = newStory.replace("94 fahrenheit", temperature);
  }

 
  story.textContent = newStory;  // Set the text of the story paragraph
  story.style.visibility = 'visible';  // Make the story visible (if it was hidden initially)
}
