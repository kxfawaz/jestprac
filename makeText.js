const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

// Get command-line arguments
let [method, path] = process.argv.slice(2);

// Function: Generate text from MarkovMachine and print
function generateText(text) {
  let mm = new MarkovMachine(text);
  console.log(mm.makeText());
}

// Function: Read from file
function makeTextFromFile(filePath) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

// Function: Fetch from URL
async function makeTextFromURL(url) {
  try {
    let res = await axios.get(url);
    generateText(res.data);
  } catch (err) {
    console.error(`Error fetching URL: ${err}`);
    process.exit(1);
  }
}

// Decide which method to use
if (method === "file") {
  makeTextFromFile(path);
} else if (method === "url") {
  makeTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}