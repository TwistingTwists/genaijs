const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');

/**
 * Converts a PDF file to plain text using the 'pdftotext' binary and saves the output to a text file.
 * 
 * @param {string} pdfPath - The path to the PDF file.
 * @returns {Promise<string>} A promise that resolves with the output file path.
 */
async function pdfToText(pdfPath) {
    return new Promise((resolve, reject) => {
      const outputDir = path.dirname(pdfPath);
      const outputFileName = path.basename(pdfPath, '.pdf') + '.txt';
      const outputFilePath = path.join(outputDir, outputFileName);
  
      // Construct the command to execute pdftotext, saving output to the specified file
      const command = `pdftotext "${pdfPath}" "${outputFilePath}"`;
  
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        if (stderr) {
          console.warn(`Warnings during conversion of ${pdfPath}: ${stderr}`);
        }
        resolve(outputFilePath); // Resolve with the path to the created file
      });
    });
  }

/**
 * Processes all PDF files in the specified directory.
 * @param {string} directoryPath - The path to the directory containing PDFs.
 */
async function processPdfFiles(directoryPath) {
  try {
    // Read all files/directories in the given directory
    const entries = await fs.readdir(directoryPath);

    // Filter for files with the '.pdf' extension
    const pdfFiles = entries.filter(entry => entry.endsWith('.pdf'));

    // Process each PDF file
    for (const pdfFile of pdfFiles) {
      const pdfPath = path.join(directoryPath, pdfFile);
      try {
        console.log(`Processing: ${pdfPath}`);
        const text = await pdfToText(pdfPath);
        // Do something with the extracted text (e.g., save to file, log, etc.)
        console.log(`Extracted text from ${pdfFile}:\n`, text); 
      } catch (error) {
        console.error(`Error processing ${pdfPath}:`, error);
      }
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

// Get directory path from environment variable
const pdfDirectory = process.env.PDF_DIRECTORY;

if (!pdfDirectory) {
  console.error('Error: PDF_DIRECTORY environment variable not set.');
  process.exit(1);
}

processPdfFiles(pdfDirectory);