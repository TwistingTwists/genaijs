## IX-SST Text Processing and Question Generation Tool

This project processes text files, especially those extracted from educational PDF documents, and generates educational materials such as concept maps and multiple-choice questions.

**Key Features:**

* **PDF to Text Conversion:**  Converts PDF files to plain text using the `pdftotext` tool.
* **Text File Processing:** Processes text files in a directory, applying the specified function to each file.
* **Gemini-powered Question Generation:** Utilizes Google's Gemini API to generate:
    * Concept maps outlining the main concepts and sub-concepts from the text.
    * Multiple-choice questions based on the provided text content.

**Getting Started:**

1. **Prerequisites:**
    * install Bun (https://bun.sh/) - `curl -fsSL https://bun.sh/install | bash`
    * PDFtoText utility (installed on your system) - `sudo apt install poppler-utils`
2. **Clone Repository:**
   ```bash
   git clone <repository-url>
   ```
3. **Install Dependencies:**
   ```bash
   bun install 
   ```
4. **Configure .env File:**
    * Create a `.env` file in the project root.
    * Add the following variables:
        ```
        GEMINI_API_KEY=<your_api_key>
        PDF_DIRECTORY=<path_to_your_pdf_directory>
        ```
5. **Run:**
   ```bash
   bun run src/main.js
   ```

**Example:**

Assuming you have a directory named `ix-sst` containing PDF files and your `.env` file is configured, running the script will:

* Convert all PDF files in the `ix-sst` directory to text files.
* Process each text file with the `gemini_run` function.
* Generate concept maps and multiple-choice questions for each text file, saving the output to separate files. 

**Contribution:**

Contributions are welcome! Please submit pull requests or issues on the project.


[x] write docs 
[] read directory from env var 

[x] gemini api key 
zip of the folder - x-sst 
de duplicate 