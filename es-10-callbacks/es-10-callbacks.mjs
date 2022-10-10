import { writeFile } from "node:fs";

writeFile("file-1.txt", "Hello Node", "utf-8", function (error) {
  if (error) {
    console.error(error);
  }

  console.log("file created!");
});
