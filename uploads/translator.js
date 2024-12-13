/* Jose Santiago Campa Morales (jscm1607 / 23766826)
- November 8th, 2024
- CSC 337 - Web Programming
- Project #6 - Translator (Part 1)
- translator.js: This script reads text files and creates six different
dictionaries for translations between English, Spanish and German.
A web server was created using Node.js and it outputs the translation
based on the path and query from the URL. */

// Modules
const http = require('http');
const fs   = require('fs');

// File Constants
const hostname = '127.0.0.1';
const port = 5000;

const spanish = 'Spanish.txt';
const german = 'German.txt';

// Dictionaries in form {original:translation}
let e2s = {};
let s2e = {};
let e2g = {};
let g2e = {};
let s2g = {};
let g2s = {};

// Function to read files and perform dictionary operations
function getFile(file, dict, change, dictO, callback) {
    // Common fs.readFile procedure
    fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        // Separate lines
        let lines = data.split('\n');

        // Regex expression to look for \, ,, /, [, (, ;, .
        const cleanWordRegex = /[\\\/\//[\],;.()]+/g;

        // For every line...
        for (const line of lines) {
            // Split word and translation
            let words = line.split('\t');

            // If there is a valid translation...
            if (words.length >= 2) {
                // Give the text variables. Trim to delete other spaces.
                let original = words[0].toLowerCase().trim();
                let translation = words[1].toLowerCase().trim();

                // Get Index of the first non-alphabet character 
                let endStr = translation.search(cleanWordRegex);

                // If there is extra characters, trim and get only the word.
                if (endStr != -1) {
                    translation = translation.substring(0, endStr).trim();
                }

                /* Similar to C++ and other languages, JS has a switch statement
                This switch reduces the number of parameters by having a string 
                parameter choose the changes instead of various booleans. */
                switch(change) {
                    // Spanish to English and German to English
                    case "reverse":
                        // Just switch the key and value
                        dict[translation] = original;
                        break;

                    // Spanish to German and German to Spanish
                    case "nonEnglish":
                        /* Since the main dictionaries were already loaded,
                        just get that value and combine it with a new key. */
                        dict[translation] = dictO[original];
                        break;

                    // English to Spanish and English to German
                    default:
                        // Basic key-value procedure
                        dict[original] = translation;
                }
            }
        }
        // Callback function as parameter
        callback();
    });
}

// Basic Server creation procedure
const server = http.createServer((req,res) => {
    // Result attributes
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    // Get path and split it into an array
    let path = req.url.slice(1);
    let pieces = path.split('/');

    // URL validation: proper URL length
    if (pieces.length > 2) {
        // /TRANSLATE/TYPE/QUERY
        let translate = pieces[0];
        let type = pieces[1];   // from ____ to _____

        // Words separated by + in the URL
        let query = pieces[2].split('+');
        let length = query.length;

        // Store translation (resets after every server call)
        let finalTranslation = [];

        // URL validation: translate path
        if (translate != 'translate') {
            report_error(req, res, "translate");
        }

        else {
            // Check if translation is available (especially for s2g/g2s)
            function checkWord(word, dict) {
                if (!(word in dict && word != "")) {
                    report_error(req, res, "word", word);
                    return 0;
                }
                // URL validation: word availability
                else {
                    return dict[word];
                }
            }

            // Similar to C++ or other languages, JS has a switch statement
            switch(type) {
                case "e2s":
                    finalTranslation = [];  // store translated words

                    // For every word, add it if it is available in the dictionary
                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], e2s);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    // Send translated word
                    res.end(finalTranslation.join(' '));
                    break;

                case "s2e":
                    finalTranslation = [];

                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], s2e);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    res.end(finalTranslation.join(' '));
                    break;

                case "e2g":
                    finalTranslation = [];

                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], e2g);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    res.end(finalTranslation.join(' '));
                    break;

                case "g2e":
                    finalTranslation = [];

                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], g2e);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    res.end(finalTranslation.join(' '));
                    break;

                case "s2g":
                    finalTranslation = [];

                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], s2g);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    res.end(finalTranslation.join(' '));
                    break;

                case "g2s":
                    finalTranslation = [];

                    for (let i = 0; i < length; i++) {
                        const translatedWord = checkWord(query[i], g2s);
                        if (translatedWord == 0) {
                            return;
                        }
                        finalTranslation[i] = translatedWord;
                    }

                    res.end(finalTranslation.join(' '));
                    break;

                // URL validation: language availability
                default:
                    report_error(req, res, "lang", type);
            }
        }
    }

    // URL validation: proper URL length 
    else {
        report_error(req, res, "len");
    }

    // ERROR FUNCTION! Built with cases for specific errors
    function report_error(req, res, issue, specifics) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");

        // Paramterized errors!
        switch(issue) {
            case "translate":
                res.end(`404: url=${req.url}\n
Please type \/translate correctly in the path!`);
            break;
            
            case "word":
                res.end(`404: url=${req.url}\n
We do not have the word "${specifics}" in our dictionary! Try again.`);
            break;

            case "lang":
                res.end(`404: url=${req.url}\n
We do not have the translation "${specifics}" in our dictionary! Try again.`);
            break;

            case "len":
                res.end(`404: url=${req.url}\n
The URL is too short! Try typing something in the path like 
"\/translate\/e2s\/hello" and see for yourself.`);
            break;

            default:
            res.end(`404: url=${req.url}\n
Some error occured! Try again.`);
        }
    }
});

// Basic server.listen to start the server.
server.listen(port, hostname, () => {
    let counter = 0;

    /* Callback function with counter.
    Tells us when all dictionaries are loaded. */
    function callback() {
        console.log(`Dictionary #${counter+1} loaded.`);
        counter++;
        if (counter == 4) {         // Load nonEnglish dictionaries
            getFile(spanish, s2g, "nonEnglish", e2g, callback);
            getFile(german, g2s, "nonEnglish", e2s, callback);
        }
        else if (counter == 6) {    // Run server after loaded dictionaries.
            console.log("All dictionaries have been loaded.");
            console.log(`Server running at http://${hostname}:${port}/`);
        }
    }

    // Read files and fill up dictionaries asynchronously
    getFile(spanish, e2s, null, null, callback);
    getFile(spanish, s2e, "reverse", null, callback);
    getFile(german, e2g, null, null, callback);
    getFile(german, g2e, "reverse", null, callback);
});