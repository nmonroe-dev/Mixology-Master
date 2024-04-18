// Add event listener for the "Choose Drink" button
document.querySelector("#userPrompt").addEventListener("click", runPrompt);
// Add event listener for the "Get Random Drink" button
document.querySelector("#randomDrink").addEventListener("click", runDrink);

// Function to handle the "Choose Drink" button click
function runPrompt() {
    // Prompt the user to enter a drink
    let userInput = prompt("Please type in the name of a drink you'd like to make.");
    let encodedInput = encodeURIComponent(userInput); //function will encode special characters, including white spaces, so that they can be safely included in a URL.
    // Fetch data from the API based on user input
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)

        .then(res => res.json())
        .then(data => {

            console.log(data.drinks[0]);
            // Display the drink image, instructions, and name
            document.getElementById("drink").src = data.drinks[0].strDrinkThumb;
            document.querySelector("p").innerText = data.drinks[0].strInstructions;
            document.querySelector("#nameOfDrink").innerText = data.drinks[0].strDrink;
            let ul = document.querySelector("#ingredients ul");
            ul.innerHTML = "";

            // Loop through the ingredients and measurements
            for (let i = 1; i <= 15; i++) {
                let ingredient = data.drinks[0][`strIngredient${i}`];
                let measurement = data.drinks[0][`strMeasure${i}`];
                // Check if ingredient exists
                if (ingredient) {
                    let newLi = document.createElement("li");
                    // Display ingredient with measurement
                    newLi.innerText = `${measurement} ${ingredient}`;
                    ul.appendChild(newLi);
                }
            }
        });
}

// Function to handle the "Get Random Drink" button click
function runDrink() {
    // Fetch a random drink from the API
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            console.log(data.drinks[0]);
            // Display the drink image, instructions, and name
            document.getElementById("drink").src = data.drinks[0].strDrinkThumb;
            document.querySelector("p").innerText = data.drinks[0].strInstructions;
            document.querySelector("#nameOfDrink").innerText = data.drinks[0].strDrink;
            let ul = document.querySelector("#ingredients ul");
            ul.innerHTML = "";

            // Loop through the ingredients and measurements
            for (let i = 1; i <= 15; i++) {
                let ingredient = data.drinks[0][`strIngredient${i}`];
                let measurement = data.drinks[0][`strMeasure${i}`];
                // Check if ingredient exists
                if (ingredient) {
                    let newLi = document.createElement("li");
                    // Display ingredient with measurement
                    newLi.innerText = `${measurement} ${ingredient}`;
                    ul.appendChild(newLi);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
