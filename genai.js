const { GoogleGenerativeAI } = require("@google/generative-ai");


async function call_gemini(img_path) {
    const system_prompt = "you are an expert educator. Your education technique involves asking questions in MCQ form to test the understanding of the concept. ";

    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        systemInstruction: system_prompt
    });
    


// const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 10000,
//     responseMimeType: "text/plain",
//   };
  
    const text_file_content = await fs.readFile(img_path, 'utf-8');

    console.log(img_path);

    const prompt = text_file_content;

    // const result = await model.generateContent([sys_prompt, prompt]);
    // const response = await result.response;
    // const text = response.text();

    // Use streaming with text-only input
    const result = await model.generateContentStream([system_prompt,prompt]);
    let text = '';
    for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        text += chunkText;
    }
    logger.info("img: %s, text: %s", img_path, text);
    return text;
}



//...const result = await model.generateContentStream([prompt, ...imageParts]);
