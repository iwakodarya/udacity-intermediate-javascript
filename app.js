let dinoFactsJson = require('./dino.json');

// Create Dino Constructor
function Dinosaur(name, weight, height, diet, fact){
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
};

const dinoFactsArray = [];

dinoFactsJson.Dinos.forEach(function(value){
    let dinosaurObject = new Dinosaur(value.species, value.weight, value.height, value.diet, value.fact);
    dinoFactsArray.push(dinosaurObject);
});

console.log(dinoFactsArray);

    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
