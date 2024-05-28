const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs').promises;
const path = require("path");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run(text_file_path) {

    const text_file_content = await fs.readFile(text_file_path, 'utf-8');
    const system_prompt = "you are an expert educator.  Making students learn concepts progressively is your expertise. You break down a concept in sub-concepts (or subtopics) in increasing level of difficulty.";


    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 10000,
        responseMimeType: "text/plain",
    };


    // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: system_prompt
    });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "I will give you a text file related to a chapter." }],
            },
            {
                role: "model",
                parts: [{ text: "Great to hear that. What would you like to know?" }],
            },
        ],
        generationConfig: generationConfig
    });


    const prompts = [
        `
        ${text_file_content}
        
        ----- 
        From the text file above, 
        Identify the main concepts to be taught to the studetns. 
        Only list the main concepts and subconcepts (as subtopics) . do not add any descrption around it.
        nest subtopics and topics.
        `,
        `make 10 MCQs (multiple choice questions) from the above chapter. Highlight the topic name MCQ belongs to. also, write correct answer with one line explanation after the answer.`,
        "Make 10 more", // Add more prompts here
    ];

    const outputDir = path.dirname(text_file_path);
    // Get the file name without the extension
    const fileNameWithoutExtension = path.basename(text_file_path, path.extname(text_file_path));


    // for (const prompt of prompts) {

    // Loop through prompts and write responses to a file
    for (let i = 0; i < prompts.length; i++) {
        const prompt = prompts[i];
        console.log(`Prompt ${i + 1}: ${prompt}\n`);
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        console.log("----------------------"); // Separate responses

        // Write the response to a file
        const outputFileName = `${fileNameWithoutExtension}-${i + 1}.txt`;
        const outputFilePath = path.join(outputDir, outputFileName);

        await fs.writeFile(outputFilePath, text);

        await delay(600); // Wait for 500ms after each response
    }

}


async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

run("./ix-sst/iess401.txt");
