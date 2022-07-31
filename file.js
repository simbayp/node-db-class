const os = require("os");
const fs = require("fs");

const quote = "Hello Vivek!";

console.log("Total memory in GB", os.totalmem() / 2 ** 30);
console.log("Free memory in GB", os.freemem() / 2 ** 30);
console.log("OS version", os.version());
console.log("CPU", os.cpus());

// fs.writeFile("./output.txt", quote, (error) => {
//   console.log("Completed!");
// });
