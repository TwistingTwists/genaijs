// import { processFilesInDirectory } from "./utils.js"
// import { gemini_run } from "./conv-history.js";
// import { processPdfFiles } from "./pdf-process.js";


// const { processFilesInDirectory } = require("./utils.js")
const { gemini_run } = require("./conv-history.js");
const { processPdfFiles } = require("./pdf-process.js");

const fs = require('fs');
const folderPath = './your_folder_path_here';

//  import { PolyfillTextDecoderStream } from './polyfill.ts'
async function main() {
  try {
    // Example usage:
    const directory = process.env.PDF_DIRECTORY || './ix-sst';
    console.log(directory);
    const extension = '.txt';

    const pdfResults = await processPdfFiles(directory);
    console.log('processPdfFiles \n :', pdfResults);

    // await processFilesInDirectory(directory, extension, gemini_run)

    const files = fs.readdirSync(directory);

    const filteredFiles = files.filter(file => file.endsWith(extension));

    const promises = filteredFiles.map(file => {
      const filePath = `${directory}/${file}`;
      console.log(filePath);
      console.log("----------procesinng ----------------");
      // gemini_run(filePath);
    });


    console.log('All files processed.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();

