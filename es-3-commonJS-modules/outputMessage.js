// Exercise 3 - Create and use CommonJS modules

// Create a script that uses module.exports to
// export a function. Create another script that
// uses require() to import the function and then calls it.

function outputMessage(message) {
  console.log(`The message is: ${message}`);
}

module.exports = outputMessage;
