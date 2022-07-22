const fs = require("fs");

const quote = "Hello World!";

fs.writeFile("./output.txt", quote, (error) => {
  console.log("Text written!");
});
