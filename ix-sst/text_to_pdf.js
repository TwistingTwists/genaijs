const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');

async function convertTextToPdf(folderPath) {
    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && path.extname(filePath) === '.txt') {

                const pdfFilePath = path.join(path.dirname(file), path.basename(file, path.extname(file)) + '.pdf');
                // Execute pandoc command to convert the text file to PDF
                const command = `pandoc "${filePath}" -o "${pdfFilePath}"`;
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error converting ${file} to PDF: ${error}`);
                    } else {
                        console.log(`${file} converted to PDF successfully`);
                    }
                });
            }
        }
    } catch (error) {
        console.error(`Error reading folder: ${error}`);
    }
}

// Usage example:
const folderPath = './your/folder/path'; // Replace with your folder path
convertTextToPdf(folderPath);