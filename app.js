// Copy/paste dinoFactsJson from dino.json
const dinoFactsJson =
    {
        "Dinos": [
            {
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": "372",
                "diet": "herbavor",
                "where": "North America",
                "when": "Late Jurasic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbavor",
                "where": "North America, Europe, Asia",
                "when": "Late Jurasic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivor",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbavor",
                "where": "World Wide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ]
    };

// Create Dino Constructor
function Dinosaur(name, weight, height, diet, fact){
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.fact = fact;
};

// Create Dino Objects
const dinoFactsArray = [];

dinoFactsJson.Dinos.forEach(function(value){
    let dinosaurObject = new Dinosaur(value.species, value.weight, value.height, value.diet, value.fact);
    dinoFactsArray.push(dinosaurObject);
});

// Create Human Object using IIFE
function createHumanUser(){
    const humanUser = (
        function(){
            const userName = document.getElementById('name').value;
            const userHeightInches = document.getElementById('feet').value * 12 + document.getElementById('inches').value;
            const userWeightLbs = document.getElementById('weight').value;
            const userDiet = document.getElementById('diet').value;
            return {
                getUserName: function() {return userName},
                getUserHeight: function() {return userHeightInches},
                getUserWeight: function() {return userWeightLbs},
                getUserDiet: function() {return userDiet}
            }
        }
    )();
    return humanUser;
};

const compareMeButton = document.getElementById('btn');

compareMeButton.addEventListener('click', function(){
    const humanUser = createHumanUser();
    console.log(humanUser.getUserName());
    console.log(humanUser.getUserHeight());
})
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
