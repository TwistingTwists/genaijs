const path = require('path');
const fs = require('fs');

/**
 * Gets a file path with a specified extension, keeping the same directory and filename base.
 *
 * @param {string} filePath - The original file path.
 * @param {string} extension - The desired extension (including the dot, e.g., '.pdf').
 * @returns {string} The new file path with the specified extension.
 *
 * @example
 * // Convert a .txt file to .pdf
 * const txtFilePath = './my_documents/report.txt';
 * const pdfFilePath = getFilePath(txtFilePath, '.pdf');
 * console.log(pdfFilePath); // Output: ./my_documents/report.pdf
 *
 * @example
 * // Change a .jpg to .png
 * const jpgFilePath = './images/photo.jpg';
 * const pngFilePath = getFilePath(jpgFilePath, '.png');
 * console.log(pngFilePath); // Output: ./images/photo.png
 *
 * @example
 * // Add a new extension to a file
 * const dataFilePath = './data/my_data.csv';
 * const backupFilePath = getFilePath(dataFilePath, '.bak');
 * console.log(backupFilePath); // Output: ./data/my_data.bak
 */
export function getFilePath(filePath, extension) {
  return path.join(path.dirname(filePath), path.basename(filePath, path.extname(filePath)) + extension);
}



// export function processFilesInDirectory(directory, extension, processFunction) {
//   return new Promise((resolve, reject) => {
//     const fs = require('fs');
//     fs.readdir(directory, (err, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       const filteredFiles = files.filter(file => file.endsWith(extension));

//       const promises = filteredFiles.map(file => {
//         const filePath = `${directory}/${file}`;
//         return new Promise((resolveFile, rejectFile) => {
//           fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//               rejectFile(err);
//             } else {
//               resolveFile(processFunction(data));
//             }
//           });
//         });
//       });

//       Promise.all(promises)
//         .then(results => resolve(results))
//         .catch(err => reject(err));
//     });
//   });
// }



export function processFilesInDirectory(directory, extension, processFunction) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const filteredFiles = files.filter(file => file.endsWith(extension));

      const promises = filteredFiles.map(file => {
        const filePath = `${directory}/${file}`;
        return new Promise((resolveFile, rejectFile) => {
          processFunction(filePath);
          resolveFile(); // Resolve the promise without waiting for file content
        });
      });

      Promise.all(promises)
        .then(() => resolve()) // Resolve the main promise once all file processes complete
        .catch(err => reject(err));
    });
  });
}

export async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
