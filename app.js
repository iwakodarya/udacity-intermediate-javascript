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
    this.facts = [fact];
};

Dinosaur.prototype.compareUserHeight = function (userHeight) {
    let difference = this.height - userHeight;

    if(userHeight >= this.height)
        return `At ${userHeight} inches tall, you are ${difference*(-1)} inches taller than ${this.name}!`;
    else
        return `${this.name} is ${difference} inches taller than you are!`;
};

Dinosaur.prototype.compareUserWeight = function (userWeight) {
    let difference = this.weight - userWeight;

    if(userWeight >= this.weight)
        return `At ${userWeight}lbs, you weight ${difference*(-1)} lbs more than ${this.name}!`;
    else
        return `At ${this.weight}, ${this.name} weights ${difference} lbs more than you!`;
};

Dinosaur.prototype.compareUserDiet = function (userDiet) {
    if(userDiet !== this.diet)
        return `Unlike you, ${this.name} is a ${this.diet}!`;
    else
        return `Just like you, ${this.name} is also a ${this.diet}!`;
};


// Create Dino Objects
const dinoFactsArray = [];

dinoFactsJson.Dinos.forEach(function(value){
    let dinosaurObject = new Dinosaur(value.species, value.weight, value.height, value.diet, value.fact);
    dinoFactsArray.push(dinosaurObject);
});

function generateTilesGrid(){
    // Create Human Object using IIFE
    const humanUser = (
        function(){
            const name = document.getElementById('name').value;
            const userHeightInches = document.getElementById('feet').value * 12 + document.getElementById('inches').value;
            const userWeightLbs = document.getElementById('weight').value;
            const userDiet = document.getElementById('diet').value;
            return {
                name,
                getUserHeight: function() {return userHeightInches},
                getUserWeight: function() {return userWeightLbs},
                getUserDiet: function() {return userDiet}
            }
        }
    )();

    // For each dinosaur, add 3 additional fun facts relative to the user (excl pigeon..)
    dinoFactsArray.forEach(function(value){
        if(value.name !== 'Pigeon'){
            value.facts.push(value.compareUserHeight(humanUser.getUserHeight()));
            value.facts.push(value.compareUserWeight(humanUser.getUserWeight()));
            value.facts.push(value.compareUserDiet(humanUser.getUserDiet()));
        }
    });

    // Add a human user to the grid in position 5
    dinoFactsArray.splice(4, 0, humanUser);

    const mainGridNode = document.getElementById('grid');

    // Create 9 infographic tiles 
    dinoFactsArray.forEach(function(value){
        // Create path to the respective image
        function getImagePath(){
            if (value instanceof Dinosaur){
                return `./images/${value.name.toLowerCase()}.png`;
            }
            else {
                return './images/human.png';
            }
        };

        imgPath = getImagePath();

        let newTile = document.createElement('div');

        // Tile name
        let tileName = document.createElement('h3');
        tileName.innerHTML = value.name;
        newTile.appendChild(tileName);

        // Tile image
        let tileImage = document.createElement('img');
        tileImage.setAttribute('src', imgPath);
        newTile.appendChild(tileImage);

        // Tile fun fact (only for dinosaurs)
        if (value instanceof Dinosaur){
            let tileFunFact = document.createElement('p');
            tileFunFact.innerHTML = value.facts[Math.floor(Math.random() * value.facts.length)];
            newTile.appendChild(tileFunFact);
        }

        newTile.classList.add('grid-item');

        mainGridNode.appendChild(newTile);
    });
};

// On button click, prepare and display infographic
const compareMeButton = document.getElementById('btn');
compareMeButton.addEventListener('click', function(){
    generateTilesGrid();
    document.getElementById('dino-compare').remove();
});


