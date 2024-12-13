/* Jose Santiago Campa Morales (jscm1607 / 23766826)
- October 9th, 2024
- CSC 337 - Web Programming
- Project #4 - Welcome to the Jumble
- script.js: This page is the script for Project 4. It uses
event-driven programming to constantly update output. Functions
are created to update the alphabet as well as the cipher text. */

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const myAlphabet = alphabet.split("");  // convert to array
let shiftAlphabet = [];                 // store Caesar Cipher alphabet
let randAlphabet = myAlphabet.slice();  // myAlphabet copy

let sliderValue;    // store value from addEventListener
let plainText;      // store value from addEventListener
let caesarCipher;   // store cipherText
let squareCipher;   // store cipherText

printGrid();        // print initial grid in order

// Changes every time there is an input update (Both Ciphers)
document.addEventListener("input", function() {
    sliderValue = document.getElementById("sliderValue").innerHTML =
    document.getElementById("slider").value;

    plainText = document.getElementById("plainText").value;

    let plainTextArray = plainText.toUpperCase().split("");

    shiftedAlphabet();

    caesarCipher = document.getElementById("caesarCipher").innerHTML =
    caesarCipherFunc(plainTextArray);

    squareCipher = document.getElementById("squareCipher").innerHTML =
    squareCipherFunc(plainTextArray);
});

// Changes every time the button is clicked (Square Cipher)
document.getElementById("buttonRand").addEventListener("click", function() {
    plainText = document.getElementById("plainText").value;

    let plainTextArray = plainText.toUpperCase().split("");

    // Update alphabet and grid
    randomAlphabet();
    printGrid();

    squareCipher = document.getElementById("squareCipher").innerHTML =
    squareCipherFunc(plainTextArray);
});

// Shifts Alphabet using a for loop
function shiftedAlphabet() {
    let newCount = 0;
    
    for (let i = 0;  i < myAlphabet.length; i++) {
        // Number() converts string to number
        let newIndexAlphabet = i + Number(sliderValue);

        // Restart alphabet when 'finishing' the first one
        if (newIndexAlphabet >= myAlphabet.length) {
            shiftAlphabet[i] = myAlphabet[newCount];
            newCount++;
        }

        // Shift values until the alphabet is 'finished'
        else {
            shiftAlphabet[i] = myAlphabet[newIndexAlphabet];
        }
    }
}

// Convert plain text into Caesar Cipher text (input as parameter)
function caesarCipherFunc(plainTextArray) {
    let cipherText = "";  // store new cipher text

    // Iterate through the input
    for (let i = 0; i < plainTextArray.length; i++) {
        // Input validation for non-alphabet input
        if (!myAlphabet.includes(plainTextArray[i])) {
            cipherText += plainTextArray[i];  // keep symbol/number value
        }

        // Alphabet input
        else {
            let count = 0;
            while (count < myAlphabet.length) {
                // Loop through the shifted alphabet
                if (plainTextArray[i] == myAlphabet[count]) {
                    // Add new letter to cipher text
                    cipherText += shiftAlphabet[count];
                    break;
                }
                count++;
            }
        }
    }
    return cipherText;
}

// Randomize alphabet using Math
function randomAlphabet() {
    let randNums = [];  // array of soon-to-be random numbers from 0 to 24
    let rand = Math.floor(Math.random() * 25);  // random number from 0 to 24

    // Loop through the alphabet 'A-Y' (length - 1)
    for (let i = 0; i < myAlphabet.length - 1; i++) {
        // Randomize number until getting a new one
        while (randNums.includes(rand)) {
            rand = Math.floor(Math.random() * 25);
        }
        // New numbers get added to the array and occupy its position
        randNums.push(rand);
        randAlphabet[i] = myAlphabet[rand];
    }
}

// Convert plain text into Square Cipher (input as parameter) 
function squareCipherFunc(plainTextArray) {
    let cipherText = ""; // store new cipher text

    // Iterate through the input
    for (let i = 0; i < plainTextArray.length; i++) {
        // Input validation for non-alphabet input
        if (!myAlphabet.includes(plainTextArray[i])) {
            cipherText += plainTextArray[i]; // keep symbol/number value
        }

        // Alphabet input
        else {
            let count = 0;
            while (count < myAlphabet.length) {
                // Loop through the shifted alphabet
                if (plainTextArray[i] == myAlphabet[count]) {
                    // Add new letter to cipher text
                    cipherText += randAlphabet[count];
                    break;
                }
                count++;
            }
        }
    }
    return cipherText;
}

// Print randomized alphabet as a 5x5 grid
function printGrid() {
    // Convert random alphabet array into a string of letters
    const printabc = randAlphabet.toString().replaceAll(",","");

    // Get div from #letters (where the grid lies)
    let lettersDiv = document.getElementById("letters");
    lettersDiv.innerHTML = "";  // initialize variable

    // For all 25 letters
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            // Create a unique div for each letter
            let letterElement = document.createElement("div");
            letterElement.innerHTML = printabc[j+i*5];

            // Add letter to the main div of letters
            lettersDiv.appendChild(letterElement);
        }
    }
}